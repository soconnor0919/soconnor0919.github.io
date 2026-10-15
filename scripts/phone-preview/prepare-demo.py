"""Create fictional appointment audio locally for the isolated simulator demo."""
from pathlib import Path
import json, subprocess, wave

WEB=Path(__file__).resolve().parents[2]
OUT=WEB/'device-cad/build/phone-demo'
OUT.mkdir(parents=True,exist_ok=True)
conversation=[
 ('Dr. Lee','Samantha','How has your right knee been since we last met, Alex?'),
 ('Alex','Daniel','The stairs are still difficult. The pain is mostly at the front of my knee. Walking on level ground is easier, but I have stopped taking my usual afternoon walk.'),
 ('Dr. Lee','Samantha','Have you had any falls, or has the knee locked or given way?'),
 ('Alex','Daniel','No falls and no locking. It feels stiff when I first get out of a chair. My walking stick helps outside.'),
 ('Dr. Lee','Samantha','We reviewed your knee X-ray together today. The changes fit with osteoarthritis. What would you most like to get back to doing?'),
 ('Alex','Daniel','Walking to the park with Jamie. And I would like to manage the stairs at home with more confidence.'),
 ('Dr. Lee','Samantha','Let us make those the goals for your physiotherapy referral. We can review your progress at the follow-up rather than changing everything at once.'),
 ('Alex','Daniel','Could you write down the referral and the follow-up date? I sometimes forget the details once I get home.'),
 ('Dr. Lee','Samantha','Of course. The referral will be in your visit notes. Please book a follow-up in six weeks, and call the practice sooner if your symptoms change or you have concerns.'),
 ('Alex','Daniel','So I will arrange physiotherapy, keep track of how the knee affects my walking, and come back in six weeks.'),
 ('Dr. Lee','Samantha','Exactly. Before you leave, what other questions do you have?'),
]

frames=bytearray();segments=[]
for i,(speaker,voice,text) in enumerate(conversation):
    aiff=OUT/f'voice-{i}.aiff';wav=OUT/f'voice-{i}.wav'
    subprocess.run(['say','-v',voice,'-r','146','-o',str(aiff),text],check=True)
    subprocess.run(['ffmpeg','-v','error','-y','-i',str(aiff),'-ar','16000','-ac','1','-c:a','pcm_s16le',str(wav)],check=True)
    with wave.open(str(wav),'rb') as f:part=f.readframes(f.getnframes())
    start=len(frames)//32;frames.extend(part);end=len(frames)//32
    segments.append({'start_ms':start,'end_ms':end,'text':text})
    frames.extend(bytes(16000)) # Half-second conversational pause.
with wave.open(str(OUT/'companion-appointment.wav'),'wb') as f:
    f.setnchannels(1);f.setsampwidth(2);f.setframerate(16000);f.writeframes(frames)
metadata={'title':'Knee pain follow-up','profile':'Alex Morgan','provider':'Dr. Jordan Lee','consent_before_recording_seconds':25,'duration_ms':len(frames)//32,'segments':segments,'source':'Local fictional dialogue voiced by macOS speech synthesis; transcript fixture matches the script. No microphone or model inference used.'}
(OUT/'fixture.json').write_text(json.dumps(metadata,indent=2)+'\n')
print(f'Prepared playable audio and {len(segments)} matching transcript segments: {metadata["duration_ms"]/1000:.1f}s')
