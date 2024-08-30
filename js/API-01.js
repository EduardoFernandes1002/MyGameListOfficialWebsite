const apiKey = 'SUA_CHAVE_API_AQUI';
const appListUrl = `https://api.steampowered.com/ISteamApps/GetAppList/v2/`;

fetch(appListUrl)
  .then(response => response.json())
  .then(data => {
    const apps = data.applist.apps;

    // Iterar por cada app e buscar seus detalhes
    apps.forEach(app => {
      const appId = app.appid;
      const detailsUrl = `https://store.steampowered.com/api/appdetails?appids=${appId}`;

      fetch(detailsUrl)
        .then(response => response.json())
        .then(data => {
            const gameData = data[appId].data;
        })
        .catch(error => {
          console.error(`Erro ao buscar detalhes do jogo ${appId}:`, error);
        });
    });
  })
  .catch(error => {
    console.error('Erro ao buscar a lista de jogos:', error);
  });
