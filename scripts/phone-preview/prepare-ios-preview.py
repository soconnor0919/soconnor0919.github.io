"""Apply the preview's iOS 27 scene lifecycle compatibility to generated iOS files.

This is a local simulator workaround, not a production app migration. Re-run after
Expo prebuild. Original generated files are backed up once alongside the fixture.
"""
from pathlib import Path
import plistlib, shutil
WEB=Path(__file__).resolve().parents[2]
ios=WEB.parent/'app/ios/Medscribe'
backup=WEB/'device-cad/build/phone-demo/generated-ios-backup'
backup.mkdir(parents=True,exist_ok=True)
p=ios/'AppDelegate.swift'
s=p.read_text()
if 'class SceneDelegate:' not in s:
    shutil.copy2(p,backup/p.name)
    old='''    window = UIWindow(frame: UIScreen.main.bounds)
    factory.startReactNative(
      withModuleName: "main",
      in: window,
      launchOptions: launchOptions)'''
    if old not in s:raise SystemExit('AppDelegate template changed; inspect it before applying scene support.')
    s=s.replace(old,'    // The scene owns the window on current iOS versions.')
    scene=(Path(__file__).parent/'SceneDelegate.swift').read_text().replace('import UIKit\n','')
    p.write_text(s+'\n'+scene)
p=ios/'Info.plist'
if not (backup/p.name).exists():shutil.copy2(p,backup/p.name)
d=plistlib.loads(p.read_bytes())
d['UIApplicationSceneManifest']={'UIApplicationSupportsMultipleScenes':False,'UISceneConfigurations':{'UIWindowSceneSessionRoleApplication':[{'UISceneConfigurationName':'Default Configuration','UISceneDelegateClassName':'$(PRODUCT_MODULE_NAME).SceneDelegate'}]}}
p.write_bytes(plistlib.dumps(d))
print('Prepared generated iOS files for the isolated iOS 27 simulator preview.')
