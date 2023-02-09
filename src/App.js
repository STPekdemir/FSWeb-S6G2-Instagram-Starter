/* 
  Buradan başlayın ve iç içe geçmiş bileşenlere doğru ilerleyin.
  Projedeki tüm dosyalara kod eklenmesi gerekmez.
  Nerelerde değişiklik yapmanız gerektiğini anlamak için her dosyayı inceleyin.
*/

// State hook u import edin
import React from "react";
import "./App.css";
import { useState } from "react";
import Gönderiler from "./bileşenler/Gönderiler/Gönderiler.js";
import AramaÇubuğu from "./bileşenler/AramaÇubuğu/AramaÇubuğu.js";
import sahteVeri from "./sahte-veri.js";

// Gönderiler (çoğul!) ve AramaÇubuğu bileşenlerini import edin, çünkü bunlar App bileşeni içinde kullanılacak
// sahteVeri'yi import edin

const App = () => {
  // Gönderi nesneleri dizisini tutmak için "gonderiler" adlı bir state oluşturun, **sahteVeri'yi yükleyin**.
  // Artık sahteVeri'ye ihtiyacınız olmayacak.
  // Arama çubuğunun çalışması için , arama kriterini tutacak başka bir state'e ihtiyacımız olacak.
  const [gonderiler, setGonderi] = useState(sahteVeri);
  const [arama, setArama] = useState(null);

  const gonderiyiBegen = (gonderiID) => {
    setGonderi(
      gonderiler.map((item) => {
        if (gonderiID === item.id) {
          item.likes += item.liked ? -1 : 1;
          item.liked = !item.liked;
        }
        return item;
      })
    );
    /*
      Bu fonksiyon, belirli bir id ile gönderinin beğeni sayısını bir artırma amacına hizmet eder.

      Uygulamanın durumu, React ağacının en üstünde bulunur, ancak iç içe geçmiş bileşenlerin stateleri değiştirememesi adil olmaz!
      Bu fonksiyon, belirli bir gönderinin beğeni sayısını artırılmasına olanak sağlamak amacıyla iç içe geçmiş bileşenlere aktarılır.

	  "setGonderi" yi çağırın ve state ine "posts.map" çağrısını iletin.
      `map` içine iletilen callback aşağıdaki mantığı gerçekleştirir:
        - gönderinin idsi "gonderiID" ile eşleşirse, istenen değerlerle yeni bir gönderi nesnesi döndürün.
        - aksi takdirde, sadece gönderi nesnesini değiştirmeden döndürün.
     */
  };
  const aramaYap = (arama) => {
    let filterSahteVeri = [];
    filterSahteVeri = sahteVeri.filter((item) => {
      return item.id == arama || item.username.includes(arama);
    });
    setGonderi(filterSahteVeri);
  };
  return (
    <div className="App">
      <AramaÇubuğu arama={arama} aramaYap={aramaYap} />
      <Gönderiler gonderiyiBegen={gonderiyiBegen} gonderiler={gonderiler} />
    </div>
  );
};

export default App;
