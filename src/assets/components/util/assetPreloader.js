export const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  };
  
  export const preloadVideo = (src) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.onloadeddata = resolve;
      video.onerror = reject;
      video.src = src;
      video.load();
    });
  };
  
  export const preloadAllAssets = async (assets, progressCallback) => {
    const total = assets.length;
    let loaded = 0;
  
    const loadPromises = assets.map(asset => {
      return new Promise((resolve, reject) => {
        if (asset.endsWith('.mp4') || asset.endsWith('.webm')) {
          return preloadVideo(asset)
            .then(() => {
              loaded++;
              if (progressCallback) progressCallback(loaded, total);
              resolve();
            })
            .catch(reject);
        } else {
          return preloadImage(asset)
            .then(() => {
              loaded++;
              if (progressCallback) progressCallback(loaded, total);
              resolve();
            })
            .catch(reject);
        }
      });
    });
  
    return Promise.all(loadPromises);
  };