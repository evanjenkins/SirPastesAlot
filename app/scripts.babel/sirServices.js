
sirPastesAlot.factory('sirServices', ['$q',
  function($q) {
    var api = {};

    api.getBins = function() {
      var deferred = $q.defer();

      chrome.storage.sync.get(["sirPasteBins"], function(result) {
        if (chrome.runtime.lastError) {
          deferred.reject("Could not load paste bins from chrome storage: " + chrome.runtime.lastError.message);
        }
        else {
          if (typeof result.sirPasteBins === 'undefined') {
            deferred.reject("Undefined");
          }
          else {
            deferred.resolve(result.sirPasteBins);
          }
        }

      });

      return deferred.promise;
    };


    api.chromeSet = function(save) {
      chrome.storage.sync.set(save, function() {
        console.log("Settings saved!");
      });
    };


    api.addBin = function(newBin) {
      var save = {};
      var self = this;
      var deferred = $q.defer();
      this.getBins().then(function(currentBins) {
        if (currentBins.length >= 1) {
          currentBins.push(newBin);
        }
        else {
          currentBins = [newBin];
        }

        save["sirPasteBins"] = currentBins;
        self.chromeSet(save);
        deferred.resolve(save["sirPasteBins"]);
      });
      return deferred.promise;
    };

    api.cutBin = function(key) {
      var save = {};
      var deferred = $q.defer();
      var self = this;
      this.getBins().then(function(currentBins) {
        currentBins.splice(key, 1);
        save["sirPasteBins"] = currentBins;
        self.chromeSet(save);
        deferred.resolve(save["sirPasteBins"]);
      }, function(response) {
        deferred.reject(response);
      });

      return deferred.promise;
    };

    // Refactor to allow name, class and other things.
    api.pasteBin = function(bin) {
      var deferred = $q.defer();

      chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
      }, function(tab) {
        tab = tab[0];
        chrome.tabs.sendRequest(tab.id, {command: "pasteBin", bin: bin}, function(response) {
          if (response.result) {
            deferred.resolve();
          }
          else {
            deferred.reject();
          }
        });
      });
      return deferred.promise;
    };

    return api;
  }
]);