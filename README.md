# live-deploy-via-codepush
Example live deploy app

1. Check version code push cli 
$ code-push -v
2. Add code push plugin add whitelist
* $ ionic plugin add cordova-plugin-code-push@latest
* $  ionic plugin add cordova-plugin-whitelist
* $  ionic build ios
3. Register your app on CodePush
* $ code-push app add myapp
4. Check deployment list
* code-push deployment ls myapp
5. Compile build
* $ Ionic build ios
6. Deploy to device ipa file
7. Change code
8. Compile build
* $ Ionic build ios
9. Deploy 	with CodePush
* code-push release-cordova myapp ios
10. Check deployment list
code-push deployment ls myapp
