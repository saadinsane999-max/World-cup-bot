const { Innertube, UniversalCache } = require('youtubei.js');
const fs = require('fs');

async function musicCommand(songTitle, threadId, api) {
  if (!songTitle) {
    api.sendMessage("🎵 Usage: /music [song title]\nExample: /music Shape of You", threadId);
    return;
  }

  api.sendMessage(`🔍 Searching for: ${songTitle}...`, threadId);

  try {
    const yt = await Innertube.create({ 
      cache: new UniversalCache(false), 
      generate_session_locally: true 
    });
    
    const search = await yt.music.search(songTitle, { type: 'video' });

    if (!search.results || !search.results[0]) {
      api.sendMessage("⚠️ Song not found!", threadId);
      return;
    }

    const stream = await yt.download(search.results[0].id, {
      type: 'audio',
      quality: 'best',
      format: 'mp4'
    });

    if (!fs.existsSync('./temp')) fs.mkdirSync('./temp');
    const filePath = `./temp/music_${Date.now()}.mp3`;
    const file = fs.createWriteStream(filePath);

    for await (const chunk of stream) {
      await new Promise((resolve, reject) => {
        file.write(chunk, (error) => error ? reject(error) : resolve());
      });
    }

    await new Promise(resolve => file.end(resolve));
    
    api.sendMessage({
      body: `🎵 Here's your song: ${songTitle}`,
      attachment: fs.createReadStream(filePath)
    }, threadId);

    setTimeout(() => fs.unlink(filePath, () => {}), 3000);

  } catch (error) {
    api.sendMessage(`❌ Error: ${error.message || 'Could not fetch music'}`, threadId);
  }
}

module.exports = { musicCommand };
