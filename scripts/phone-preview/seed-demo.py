"""Seed only the dedicated, empty website-preview simulator with matching audio."""
from pathlib import Path
import argparse, datetime, json, math, shutil, sqlite3, subprocess, uuid

WEB=Path(__file__).resolve().parents[2]
BUILD=WEB/'device-cad/build/phone-demo'
p=argparse.ArgumentParser(description=__doc__)
p.add_argument('--simulator',required=True)
a=p.parse_args()
def sim(*args):return subprocess.check_output(['xcrun','simctl',*args],text=True).strip()
devices=json.loads(sim('list','devices','--json'))['devices']
device=next(d for group in devices.values() for d in group if d['udid']==a.simulator)
if device['name']!='Medscribe Website Preview':raise SystemExit('Refusing to seed a personal simulator. Use Medscribe Website Preview.')
container=Path(sim('get_app_container',a.simulator,'com.so.medscribe','data'))
db=container/'Documents/SQLite/medscribe.db'
if not db.exists():raise SystemExit('Launch the app once to initialize its schema, then terminate it before seeding.')
fixture=json.loads((BUILD/'fixture.json').read_text())
with sqlite3.connect(db) as database:
    count=database.execute("SELECT count(*) FROM appointments WHERE id NOT LIKE 'companion-demo-%'").fetchone()[0]
    if count:raise SystemExit('Refusing to modify a simulator containing other appointments.')
    database.backup(sqlite3.connect(BUILD/'before-demo.sqlite'))
    profile=database.execute('SELECT id FROM profiles ORDER BY created_at LIMIT 1').fetchone()[0]
    database.execute('UPDATE profiles SET display_name=? WHERE id=?',(fixture['profile'],profile))
    for k,v in [('onboarding_completed','1'),('active_profile_id',profile),('theme_preference','light')]:
        database.execute('INSERT OR REPLACE INTO app_settings(key,value) VALUES(?,?)',(k,v))
    media=container/'Documents/companion-demo';media.mkdir(exist_ok=True)
    audio=media/'appointment.wav';shutil.copyfile(BUILD/'companion-appointment.wav',audio)
    started=datetime.datetime.now(datetime.timezone.utc)
    now=started.isoformat()
    consent=(started-datetime.timedelta(seconds=fixture['consent_before_recording_seconds'])).isoformat()
    visit='companion-demo-appointment';transcript='companion-demo-transcript'
    database.execute('DELETE FROM transcript_segments WHERE transcript_id=?',(transcript,))
    database.execute('DELETE FROM transcripts WHERE id=?',(transcript,))
    database.execute('DELETE FROM appointments WHERE id=?',(visit,))
    database.execute('''INSERT INTO appointments(id,title,provider_name,location,patient_notes,created_at,duration_seconds,audio_file_path,consent_given,consent_timestamp,status,profile_id)
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?)''',(visit,fixture['title'],fixture['provider'],'Imported from Medscribe companion','Recorded on your companion. Original audio kept on the device.',now,fixture['duration_ms']//1000,audio.as_uri(),1,consent,'transcribed',profile))
    database.execute('INSERT INTO transcripts(id,appointment_id,full_text,created_at,profile_id) VALUES(?,?,?,?,?)',(transcript,visit,'\n\n'.join(s['text'] for s in fixture['segments']),now,profile))
    for i,segment in enumerate(fixture['segments']):
        database.execute('INSERT INTO transcript_segments(id,transcript_id,start_ms,end_ms,text) VALUES(?,?,?,?,?)',(f'companion-demo-segment-{i}',transcript,segment['start_ms'],segment['end_ms'],segment['text']))
    history = [
        ('asthma', 'Asthma review', 'Dr. Jordan Lee', 'Primary care', 12, 842),
        ('physio', 'Physiotherapy assessment', 'Sarah Patel, PT', 'Physiotherapy', 28, 1124),
        ('annual', 'Annual health check', 'Dr. Jordan Lee', 'Primary care', 55, 1642),
        ('eye', 'Eye examination', 'Dr. Maya Chen', 'Optometry', 84, 965),
        ('medication', 'Medication review', 'Dr. Jordan Lee', 'Primary care', 110, 738),
    ]
    for suffix, title, clinician, location, days_ago, duration in history:
        entry_id=f'companion-demo-history-{suffix}'
        database.execute('DELETE FROM appointments WHERE id=?', (entry_id,))
        entry_time=(started-datetime.timedelta(days=days_ago)).isoformat()
        database.execute("""INSERT INTO appointments(id,title,provider_name,location,created_at,duration_seconds,consent_given,consent_timestamp,status,profile_id)
            VALUES(?,?,?,?,?,?,?,?,?,?)""", (entry_id,title,clinician,location,entry_time,duration,1,entry_time,'recorded',profile))
    database.commit()
(BUILD/'seed-provenance.json').write_text(json.dumps({'simulator':a.simulator,'application':'com.so.medscribe','appointment':visit,'source':fixture['source'],'audio_duration_ms':fixture['duration_ms'],'physical_import_verified':False},indent=2)+'\n')
print('Seeded isolated Medscribe preview with playable companion audio and timestamped transcript.')
