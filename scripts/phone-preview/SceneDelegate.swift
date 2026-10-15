import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
  var window: UIWindow?
  func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
    guard let windowScene = scene as? UIWindowScene,
          let appDelegate = UIApplication.shared.delegate as? AppDelegate else { return }
    let sceneWindow = UIWindow(windowScene: windowScene)
    window = sceneWindow
    appDelegate.window = sceneWindow
    var launchOptions: [UIApplication.LaunchOptionsKey: Any] = [:]
    if let context = connectionOptions.urlContexts.first { launchOptions[.url] = context.url }
    appDelegate.reactNativeFactory?.startReactNative(withModuleName: "main", in: sceneWindow, launchOptions: launchOptions)
  }
  func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    guard let appDelegate = UIApplication.shared.delegate as? AppDelegate else { return }
    for context in URLContexts { _ = appDelegate.application(UIApplication.shared, open: context.url, options: [:]) }
  }
  func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
    guard let appDelegate = UIApplication.shared.delegate as? AppDelegate else { return }
    _ = appDelegate.application(UIApplication.shared, continue: userActivity, restorationHandler: { _ in })
  }
  func sceneDidBecomeActive(_ scene: UIScene) { (UIApplication.shared.delegate as? AppDelegate)?.applicationDidBecomeActive(UIApplication.shared) }
  func sceneWillResignActive(_ scene: UIScene) { (UIApplication.shared.delegate as? AppDelegate)?.applicationWillResignActive(UIApplication.shared) }
  func sceneDidEnterBackground(_ scene: UIScene) { (UIApplication.shared.delegate as? AppDelegate)?.applicationDidEnterBackground(UIApplication.shared) }
  func sceneWillEnterForeground(_ scene: UIScene) { (UIApplication.shared.delegate as? AppDelegate)?.applicationWillEnterForeground(UIApplication.shared) }
}
