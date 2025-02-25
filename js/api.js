// Delay fonksiyonu
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "a18611c9c9msh5bfa08f1405b7ebp1189dfjsn1a97338b2630",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};

// Popüler şarkıları getiren fonksiyon
const getPopular = async () => {
  try {
    const url = "https://shazam.p.rapidapi.com/search?term=galatasaray";
    const response = await fetch(url, options);
    const data = await response.json();

    if (!data.tracks?.hits) {
      throw new Error("Veri alınamadı!");
    }

    // Veriyi döndürmeden önce küçük bir delay ekle
    await delay(2000); // 2 saniye bekleme

    return data.tracks.hits.map((item) => item.track);
  } catch (error) {
    console.error("Hata oluştu:", error);
    return [];
  }
};

// Arama fonksiyonu
const searchMusic = async (query) => {
  try {
    const response = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}`,
      options
    );
    const data = await response.json();

    if (!data.tracks?.hits) {
      throw new Error("Arama sonucu bulunamadı!");
    }

    // Veriyi döndürmeden önce küçük bir delay ekle
    await delay(2000); // 2 saniye bekleme

    return data.tracks.hits.map((i) => i.track);
  } catch (error) {
    console.error("Hata oluştu:", error);
    return [];
  }
};

export { getPopular, searchMusic };
