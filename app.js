const express = require('express');
const path = require('path')
const fs = require('fs')
const youtubedl = require('youtube-dl')
var ytpl = require('ytpl');
const ytdl = require('ytdl-core');

const app = express();

app.set('view engine', 'ejs')

app.get('/', (req,res) => {
    res.send("Hello world")
})

app.get('/youtube-dl', async(req, res) => {
    ytpl('PLMFLgBNDQhNBfzy_KuSYhbHRWzTKktRYK', async function(err, playlist) {
        if(err) throw err;
        // console.log(playlist)
        
        let {items} = playlist
        for (let item of items){
            
            console.log(ytdl.validateID(item.id));
            ytdl(item.url_simple)
            .pipe(fs.createWriteStream('videos/' + item.id + '.mp4'))

        }
           
        
        res.render('index', {playlist})
    });
    


    // ytdl('http://www.youtube.com/watch?v=A02s8omM_hI', { filter: format => format.container === 'mp4' })
    // ytdl.getInfo('A02s8omM_hI', (err, info) => {
    //     if (err) throw err;
    //     let format = ytdl.chooseFormat(info.formats, { quality: '18' });
    //     if (format) {
    //       console.log('Format found!');
    //     }
    // })

    

})


app.listen(80, () => console.log('App started at port 80'))