// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    var app = {
      // Application Constructor
      initialize: function () {
        this.bindEvents();
      },
      // Bind Event Listeners
      //
      // Bind any events that are required on startup. Common events are:
      // 'load', 'deviceready', 'offline', and 'online'.
      bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
      },
      // deviceready Event Handler
      //
      // The scope of 'this' is the event. In order to call the 'receivedEvent'
      // function, we must explicitly call 'app.receivedEvent(...);'
      onDeviceReady: function () {

        /* Invoke sync with the custom options, which enables user interaction.
         For customizing the sync behavior, see SyncOptions in the CodePush documentation. */
        window.codePush.sync(
          function (syncStatus) {
            switch (syncStatus) {
              // Result (final) statuses
              case SyncStatus.UPDATE_INSTALLED:
                app.displayMessage("The update was installed successfully. For InstallMode.ON_NEXT_RESTART, the changes will be visible after application restart. ");
                break;
              case SyncStatus.UP_TO_DATE:
                app.displayMessage("The application is up to date.");
                break;
              case SyncStatus.UPDATE_IGNORED:
                app.displayMessage("The user decided not to install the optional update.");
                break;
              case SyncStatus.ERROR:
                app.displayMessage("An error occured while checking for updates");
                break;

              // Intermediate (non final) statuses
              case SyncStatus.CHECKING_FOR_UPDATE:
                console.log("Checking for update.");
                break;
              case SyncStatus.AWAITING_USER_ACTION:
                console.log("Alerting user.");
                break;
              case SyncStatus.DOWNLOADING_PACKAGE:
                console.log("Downloading package.");
                break;
              case SyncStatus.INSTALLING_UPDATE:
                console.log("Installing update");
                break;
            }
          },
          {
            installMode: InstallMode.ON_NEXT_RESTART, updateDialog: true
          },
          function (downloadProgress) {
            console.log("Downloading " + downloadProgress.receivedBytes + " of " + downloadProgress.totalBytes + " bytes.");
          });

        // continue application initialization
        app.receivedEvent('deviceready');
      },
      // Update DOM on a Received Event
      receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
      },
      // Displays an alert dialog containing a message.
      displayMessage: function (message) {
        navigator.notification.alert(
          message,
          null,
          'CodePush',
          'OK');
      }
    };

    app.initialize();

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
