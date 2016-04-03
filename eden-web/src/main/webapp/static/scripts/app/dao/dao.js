(function(win, $) {


    /**
     * 播放歌曲
     * @param song_id
     */
    var playSong=function(song_id){
        var songData={
            songId:song_id
        };
        utils.post(baseUrl+'/api/song/playSong',songData,function(data){
            return data;
        },"json")
    };

    /**
     * 通过歌曲id拿到歌曲
     */
    var getSong=function(song_id){
        var songData={
            songId:song_id
        };
        return utils.post(baseUrl+'/api/song/getSong',songData,function(data){
            return data;
        },"json")
    };
    /**
     * 通过歌单id找到歌曲
     */
    var getSongInSonglist=function(songlistId){
      var songlistData={
          songlistId:songlistId
      };
      return utils.post(baseUrl+'/api/songlist/findSongCustomInSonglist',songlistData,function(data){
        return data;
      },"json")
    };

    /**
     * 通过专辑id找到专辑中的音乐
     * @param albumId
     * @returns {*}
     */
    var getSongInAlbum=function(albumId){
        var albumData={
            albumId:albumId
        };
        return utils.post(baseUrl+'/api/songlist/findSongCustomInAlbum',albumData,function(data){
            return data;
        },"json")
    };


    /**
     * 添加歌曲,可以是多首歌曲。到播放列表,都跟用户相关
     * @param songids 歌曲id数组
     */
    var addSongsToUserPlaylist=function(songids){
        var songidsData={
            songids:songids
        };

        return utils.post(baseUrl+'/api/user/addSongToPlaylist',songidsData,function(data){
            return data;
        })
    };



    //用户注册
    var register=function(registerData){
      return utils.post(baseUrl+'/api/user/register',registerData,function(data){
          return data;
      });
    };

    //用户登录
    var login=function(logData){
        return utils.post(baseUrl+'/api/user/login',logData,function(data){
            return data;
        });
    };
    //用户注销
    var logout=function(){
        return utils.post(baseUrl+'/api/user/logout',{},function(data){
            return data;
        });
    };







    win.dao={
        playSong:playSong,
        getSong:getSong,
        getSongInSonglist:getSongInSonglist,
        getSongInAlbum:getSongInAlbum,
        addSongsToUserPlaylist:addSongsToUserPlaylist,
        register:register,
        login:login,
        logout:logout
    }



})(window, jQuery);