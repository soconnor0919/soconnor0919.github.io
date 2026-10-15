"""Populate the dedicated website simulator with the handheld's fictional card."""
from pathlib import Path
import datetime, json, sqlite3, subprocess
SIM='05CD9946-6760-4DC7-BF01-ECE3725B70B3'
def sim(*args): return subprocess.check_output(['xcrun','simctl',*args],text=True).strip()
devices=json.loads(sim('list','devices','--json'))['devices']
assert next(d for group in devices.values() for d in group if d['udid']==SIM)['name']=='Medscribe Website Preview'
container=Path(sim('get_app_container',SIM,'com.so.medscribe','data'))
build=Path(__file__).resolve().parents[2]/'device-cad/build/phone-demo'
with sqlite3.connect(container/'Documents/SQLite/medscribe.db') as db:
 assert db.execute("SELECT count(*) FROM appointments WHERE id NOT LIKE 'companion-demo-%'").fetchone()[0]==0
 assert db.execute("SELECT count(*) FROM medications WHERE id NOT LIKE 'companion-demo-%'").fetchone()[0]==0
 db.backup(sqlite3.connect(build/'before-know-me.sqlite'))
 profile=db.execute('SELECT id FROM profiles ORDER BY created_at LIMIT 1').fetchone()[0]
 now=datetime.datetime.now(datetime.timezone.utc).isoformat()
 db.execute('''UPDATE profiles SET display_name=?,know_me_conditions=?,know_me_allergies=?,know_me_emergency_name=?,know_me_emergency_phone=?,know_me_critical_notes=?,know_me_updated_at=?,know_me_changed_at=? WHERE id=?''',('Alex Morgan','Asthma; osteoarthritis','Penicillin — hives\nLatex — skin rash','Jamie Morgan — family caregiver','(617) 555-0142','Walking aid. Time to answer. Speak directly. Written next steps.\nPrimary care: Dr. Jordan Lee · (617) 555-0168',now,now,profile))
 db.execute("INSERT OR REPLACE INTO app_settings(key,value) VALUES('theme_preference','light')")
 for key,name,frequency,kind,times in [('budesonide','Budesonide inhaler','Morning and evening','fixed_times','["08:00","20:00"]'),('albuterol','Albuterol inhaler','As needed','as_needed','[]')]:
  db.execute("""INSERT OR REPLACE INTO medications(id,name,frequency,profile_id,schedule_kind,schedule_times_json,schedule_source_kind,schedule_confirmed_at,schedule_timezone) VALUES(?,?,?,?,?,?,?,?,?)""",('companion-demo-'+key,name,frequency,profile,kind,times,'prescribing_team',now,None))
 print('Seeded matching fictional Alex Morgan Know Me card.')
