import { getPopular, searchMusic } from "./api.js";
import { elements, renderCard, renderLoader, renderPlayer } from "./ui.js";

// Sayfanın yüklenme anı
document.addEventListener("DOMContentLoaded", () => {
  // Loader'ı render et
  renderLoader();

  // Api'a istek at sonrasında gelen veriyi alıp cardları render et
  getPopular()
    .then((data) => renderCard(data))
    .catch((err) => {
      console.log(`Hataa: ${err}`);
      alert("Üzgünüz bir hata oluştu");
    });
});

// Formun gönderilmesini izleyen fonksiyon
elements.form.addEventListener("submit", (e) => {
  // Sayfa yenilemesini engelle
  e.preventDefault();
  // Inputtaki değere eriş
  const query = e.target[0].value;

  // Aratılan bir değer yoksa fonksiyonu durdur
  if (!query) {
    return alert("Lütfen şarkı veya şarkıcı adı aratınız");
  }

  // Loader'ı render et
  renderLoader();

  // Aratılan kelime ile api isteği at
  searchMusic(query)
    .then((data) => renderCard(data))
    .catch((err) => {
      console.log(`Hataa: ${err}`);
      alert("Üzgünüz bir hata oluştu");
    });
});

// Şarkı listesi alanındaki tıklanma olaylarını izle
elements.list.addEventListener("click", (e) => {
  // 'play' sınıfına sahip öğeyi tıklamak
  if (e.target.classList.contains("play")) {
    // play butonunun en üst öğesine ulaşmak için closest() kullan
    const card = e.target.closest(".card");

    if (card) {
      // Card'daki verileri al
      const data = card.dataset;

      // renderPlayer ile şarkıyı render et
      renderPlayer({
        title: data.title,
        subtitle: data.subtitle,
        image: data.image,
        mp3: data.mp3,
      });
    }
  }
});
