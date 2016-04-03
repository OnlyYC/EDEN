(function(win, $) {

    var song={
        //播放歌曲，通过点击封面上按钮
        playSingleSong:function(song_id){
            dao.getSong(song_id).done(function(data){
                Base.processData(data,function(data){
                    //添加并播放
                    addToPlayList(data.data,true);
                });

            });
        }
    };

    var songlist={
        //播放整个歌单，播放列表要更新
        playSonglist:function(songlistId){
            dao.getSongInSonglist(songlistId).done(function(data){
                Base.processData(data,function(data){
                    myPlaylist.setPlaylist(data.data);
                    myPlaylist.play(0);

                });
            })
        }
    };


    var album={
        /**
         * 播放专辑中的歌曲,播放列表要更新
         * @param albumId
         */
        playAlbum:function(albumId){
            dao.getSongInAlbum(albumId).done(function(data){
                Base.processData(data,function(data){
                    myPlaylist.setPlaylist(data.data);
                    myPlaylist.play(0);
                    //拿到所有歌曲id


                    //添加到播放列表
                    dao.addSongsToUserPlaylist()
                });
            });
        }
    };

    var user={
        register:function(registerData,register_success,register_fail){
            dao.register(registerData).done(function(data){
                Base.processData(data,function(data){
                    Alert.success("注册成功，请先激活邮箱再登陆")
                    register_success();
                },function(data){
                    Alert.error(data.message);
                    register_fail();
                });
            });
        },
        login:function(logData,login_success,login_fail){
            dao.login(logData).done(function(data){
                Base.processData(data,function(data){
                    Alert.success("登录成功");
                    login_success();
                },function(data){
                    login_fail();
                })
            })
        },
        logout:function(){
            dao.logout().done(function(data){
                Alert.success("注销成功");
                setTimeout(function(){
                    //刷新页面
                    window.location.reload();
                },1000);
            })
        }

    };

    win.server={
        song:song,
        songlist:songlist,
        album:album,
        user:user
    }


})(window, jQuery);