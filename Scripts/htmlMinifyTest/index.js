const { minify } = require('html-minifier');


const main = (body) => {
  console.log(minify(body, {
    minifyCSS: true,
    minifyJS: true,
    collapseWhitespace: true
  }));
};

// const entityMap = {
//   '\'': '&apos;',
//   '<': '&lt;',
//   '>': '&gt;',
//   ' ': '&nbsp;',
//   '¡': '&iexcl;',
//   '¢': '&cent;',
//   '£': '&pound;',
//   '¤': '&curren;',
//   '¥': '&yen;',
//   '¦': '&brvbar;',
//   '§': '&sect;',
//   '¨': '&uml;',
//   '©': '&copy;',
//   ª: '&ordf;',
//   '«': '&laquo;',
//   '¬': '&not;',
//   '®': '&reg;',
//   '¯': '&macr;',
//   '°': '&deg;',
//   '±': '&plusmn;',
//   '²': '&sup2;',
//   '³': '&sup3;',
//   '´': '&acute;',
//   µ: '&micro;',
//   '¶': '&para;',
//   '·': '&middot;',
//   '¸': '&cedil;',
//   '¹': '&sup1;',
//   º: '&ordm;',
//   '»': '&raquo;',
//   '¼': '&frac14;',
//   '½': '&frac12;',
//   '¾': '&frac34;',
//   '¿': '&iquest;',
//   À: '&Agrave;',
//   Á: '&Aacute;',
//   Â: '&Acirc;',
//   Ã: '&Atilde;',
//   Ä: '&Auml;',
//   Å: '&Aring;',
//   Æ: '&AElig;',
//   Ç: '&Ccedil;',
//   È: '&Egrave;',
//   É: '&Eacute;',
//   Ê: '&Ecirc;',
//   Ë: '&Euml;',
//   Ì: '&Igrave;',
//   Í: '&Iacute;',
//   Î: '&Icirc;',
//   Ï: '&Iuml;',
//   Ð: '&ETH;',
//   Ñ: '&Ntilde;',
//   Ò: '&Ograve;',
//   Ó: '&Oacute;',
//   Ô: '&Ocirc;',
//   Õ: '&Otilde;',
//   Ö: '&Ouml;',
//   '×': '&times;',
//   Ø: '&Oslash;',
//   Ù: '&Ugrave;',
//   Ú: '&Uacute;',
//   Û: '&Ucirc;',
//   Ü: '&Uuml;',
//   Ý: '&Yacute;',
//   Þ: '&THORN;',
//   ß: '&szlig;',
//   à: '&agrave;',
//   á: '&aacute;',
//   â: '&acirc;',
//   ã: '&atilde;',
//   ä: '&auml;',
//   å: '&aring;',
//   æ: '&aelig;',
//   ç: '&ccedil;',
//   è: '&egrave;',
//   é: '&eacute;',
//   ê: '&ecirc;',
//   ë: '&euml;',
//   ì: '&igrave;',
//   í: '&iacute;',
//   î: '&icirc;',
//   ï: '&iuml;',
//   ð: '&eth;',
//   ñ: '&ntilde;',
//   ò: '&ograve;',
//   ó: '&oacute;',
//   ô: '&ocirc;',
//   õ: '&otilde;',
//   ö: '&ouml;',
//   '÷': '&divide;',
//   ø: '&oslash;',
//   ù: '&ugrave;',
//   ú: '&uacute;',
//   û: '&ucirc;',
//   ü: '&uuml;',
//   ý: '&yacute;',
//   þ: '&thorn;',
//   ÿ: '&yuml;',
//   Œ: '&OElig;',
//   œ: '&oelig;',
//   Š: '&Scaron;',
//   š: '&scaron;',
//   Ÿ: '&Yuml;',
//   ƒ: '&fnof;',
//   ˆ: '&circ;',
//   '˜': '&tilde;',
//   Α: '&Alpha;',
//   Β: '&Beta;',
//   Γ: '&Gamma;',
//   Δ: '&Delta;',
//   Ε: '&Epsilon;',
//   Ζ: '&Zeta;',
//   Η: '&Eta;',
//   Θ: '&Theta;',
//   Ι: '&Iota;',
//   Κ: '&Kappa;',
//   Λ: '&Lambda;',
//   Μ: '&Mu;',
//   Ν: '&Nu;',
//   Ξ: '&Xi;',
//   Ο: '&Omicron;',
//   Π: '&Pi;',
//   Ρ: '&Rho;',
//   Σ: '&Sigma;',
//   Τ: '&Tau;',
//   Υ: '&Upsilon;',
//   Φ: '&Phi;',
//   Χ: '&Chi;',
//   Ψ: '&Psi;',
//   Ω: '&Omega;',
//   α: '&alpha;',
//   β: '&beta;',
//   γ: '&gamma;',
//   δ: '&delta;',
//   ε: '&epsilon;',
//   ζ: '&zeta;',
//   η: '&eta;',
//   θ: '&theta;',
//   ι: '&iota;',
//   κ: '&kappa;',
//   λ: '&lambda;',
//   μ: '&mu;',
//   ν: '&nu;',
//   ξ: '&xi;',
//   ο: '&omicron;',
//   π: '&pi;',
//   ρ: '&rho;',
//   ς: '&sigmaf;',
//   σ: '&sigma;',
//   τ: '&tau;',
//   υ: '&upsilon;',
//   φ: '&phi;',
//   χ: '&chi;',
//   ψ: '&psi;',
//   ω: '&omega;',
//   ϑ: '&thetasym;',
//   ϒ: '&Upsih;',
//   ϖ: '&piv;',
//   '–': '&ndash;',
//   '—': '&mdash;',
//   '‘': '&lsquo;',
//   '’': '&rsquo;',
//   '‚': '&sbquo;',
//   '“': '&ldquo;',
//   '”': '&rdquo;',
//   '„': '&bdquo;',
//   '†': '&dagger;',
//   '‡': '&Dagger;',
//   '•': '&bull;',
//   '…': '&hellip;',
//   '‰': '&permil;',
//   '′': '&prime;',
//   '″': '&Prime;',
//   '‹': '&lsaquo;',
//   '›': '&rsaquo;',
//   '‾': '&oline;',
//   '⁄': '&frasl;',
//   '€': '&euro;',
//   ℑ: '&image;',
//   '™': '&trade;',
//   '←': '&larr;',
//   '↑': '&uarr;',
//   '→': '&rarr;',
//   '↓': '&darr;',
//   '↔': '&harr;',
//   '↵': '&crarr;',
//   '⇐': '&lArr;',
//   '⇑': '&UArr;',
//   '⇒': '&rArr;',
//   '⇓': '&dArr;',
//   '⇔': '&hArr;',
//   '∀': '&forall;',
//   '∂': '&part;',
//   '∃': '&exist;',
//   '∅': '&empty;',
//   '∇': '&nabla;',
//   '∈': '&isin;',
//   '∉': '&notin;',
//   '∋': '&ni;',
//   '∏': '&prod;',
//   '∑': '&sum;',
//   '−': '&minus;',
//   '∗': '&lowast;',
//   '√': '&radic;',
//   '∝': '&prop;',
//   '∞': '&infin;',
//   '∠': '&ang;',
//   '∧': '&and;',
//   '∨': '&or;',
//   '∩': '&cap;',
//   '∪': '&cup;',
//   '∫': '&int;',
//   '∴': '&there4;',
//   '∼': '&sim;',
//   '≅': '&cong;',
//   '≈': '&asymp;',
//   '≠': '&ne;',
//   '≡': '&equiv;',
//   '≤': '&le;',
//   '≥': '&ge;',
//   '⊂': '&sub;',
//   '⊃': '&sup;',
//   '⊄': '&nsub;',
//   '⊆': '&sube;',
//   '⊇': '&supe;',
//   '⊕': '&oplus;',
//   '⊗': '&otimes;',
//   '⊥': '&perp;',
//   '⋅': '&sdot;',
//   '⌈': '&lceil;',
//   '⌉': '&rceil;',
//   '⌊': '&lfloor;',
//   '⌋': '&rfloor;',
//   '⟨': '&lang;',
//   '⟩': '&rang;',
//   '◊': '&loz;',
//   '♠': '&spades;',
//   '♣': '&clubs;',
//   '♥': '&hearts;',
//   '♦': '&diams;',
//   '"': '&quot;',
//   '&': '&amp;',
//   ℘: '&weierp;',
//   ℜ: '&real;',
//   ℵ: '&alefsym;'
// };

// const cleanedEncoderUtil = (html) => {
//   let cleaned = html;
//   Object.keys(entityMap).forEach((key) => {
//     const entity = entityMap[key];
//     const regex = new RegExp(entity, 'g');
//     cleaned = cleaned.replace(regex, key);
//   });
//   cleaned = cleaned.replace(/(\r\n|\n|\r)/gm, ' ');
//   return cleaned;
// };


// const html = `<strong>KUALA LUMPUR:</strong>Menteri Perdagangan Antarabangsa dan Industri, Datuk Seri Mohamed Azmin Ali memaklumkan beliau negatif jangkitan wabak COVID-19.&lt;br /&gt;
// &lt;br /&gt;
// Azmin membuat pengumuman berkenaan menerusi satu muat naik di laman Facebook peribadinya pada Rabu.&lt;br /&gt;
// &lt;br /&gt;
// &amp;ldquo;Banyak spekulasi mengenai status kesihatan saya. Terima kasih kerana ramai yang prihatin dan mendoakan kesejahteraan dan keselamatan saya sekeluarga.&lt;br /&gt;
// &lt;br /&gt;
// &amp;quot;Saya telah menjalani dua ujian COVID-19. Alhamdulillah, keputusan kedua-dua ujian adalah negatif,&amp;rdquo; katanya.&lt;br /&gt;
// &lt;br /&gt;
// &lt;div class=&quot;embed-facebook&quot;&gt;
// 	&lt;div class=&quot;fb-post&quot; data-href=&quot;https://www.facebook.com/MohamedAzminAli/posts/3508031402594514&quot; show_text=&quot;true&amp;quot;&quot;&gt;
// 		&amp;nbsp;&lt;/div&gt;
// &lt;/div&gt;
// &lt;div class=&quot;detail-media-caption&quot; style=&quot;text-align:center&quot;&gt;
// 	Sumber Facebook MohamedAzminAli&lt;/div&gt;
// &lt;br /&gt;
// Pengumuman itu sekali gus &lt;a href=&quot;https://www.astroawani.com/berita-malaysia/azmin-ali-positif-covid19-262469&quot; target=&quot;_blank&quot;&gt;menamatkan spekulasi yang bertiup kencang di media sosial semalam yang mendakwa Ahli Parlimen Gombak itu dijangkiti pandemik itu&lt;/a&gt;.&lt;br /&gt;
// &lt;br /&gt;
// Dalam hantaran yang sama, Azmin juga memaklumkan beliau akan terus menjalani kuarantin kendiri sehingga ujian saringan COVID-19 ketiga dibuat di Pejabat Kesihatan Daerah Putrajaya.&lt;br /&gt;
// &lt;br /&gt;
// &amp;ldquo;Buat masa ini, saya tetap melaksanakan tugas dan tanggungjawab dari rumah.&lt;br /&gt;
// &lt;br /&gt;
// &amp;ldquo;Saya mendoakan semoga seluruh rakyat Malaysia senantiasa dilindungi dari jangkitan COVID-19,&amp;rdquo; katanya.&lt;br /&gt;
// &lt;br /&gt;
// &lt;div class=&quot;embed-responsive embed-responsive-16by9&quot; style=&quot;text-align:center&quot;&gt;
// 	&lt;iframe class=&quot;embed-responsive-item&quot; height=&quot;233&quot; src=&quot;https://embed.astroawani.com/embed-video/id/1870373&quot; width=&quot;295&quot;&gt;&lt;/iframe&gt;&lt;/div&gt;
// &lt;br /&gt;
// Sebelum ini, dalam perutusan khas situasi semasa COVID-19 oleh Perdana Menteri, Tan Sri Muhyiddin Yassin pada Selasa memaklumkan, beliau dan tujuh menteri serta enam timbalan menteri kini menjalani kuarantin kendiri di rumah.`;

// const parsedHTML = cleanedEncoderUtil(html);

const html = `<!DOCTYPE html>
<html lang="ms">

<head>
  <link href="https://de-digital-fortress-stg-assets.eco.astro.com.my/staging/76f6a4c38f3b6dc00c570958a3e07dda.png"
    type="image/x-icon" rel="shortcut icon">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="index,follow">
  <meta charset="UTF-8">
  <meta name="title"
    content="Selalu Bantu Orang Buat Umrah, Inul Buat Kerana Tanggungjawab Bukan Populariti | Gempak" />
  <meta name="description" content="Selalu Bantu Orang Buat Umrah, Inul Buat Kerana Tanggungjawab Bukan Populariti" />
  <meta name="keywords" content="#MLM2019,#Inul" />
  <meta name="copyright" content="Astro" />
  <meta name="subject"
    content="Selalu Bantu Orang Buat Umrah, Inul Buat Kerana Tanggungjawab Bukan Populariti | Gempak" />
  <meta property="og:title" content="Selalu Bantu Orang Buat Umrah, Inul Buat Kerana Tanggungjawab Bukan Populariti" />
  <meta property="og:image"
    content="https://d3avoj45mekucs.cloudfront.net/astrogempak/media/gambar/inul-susah.jpg?ext=.jpg" />
  <meta property="og:image:secure_url"
    content="https://d3avoj45mekucs.cloudfront.net/astrogempak/media/gambar/inul-susah.jpg?ext=.jpg" />
  <meta property="og:url"
    content="https://de-gempak-web-portal-dev.eco.astro.com.my/indonesia/selalu-bantu-orang-buat-umrah-inul-buat-kerana-tanggungjawab-bukan-populariti-29465">
  <meta property="fb:app_id" content="713676435467449" />
  <meta property="fb:pages" content="TBD" />
  <meta property="og:site_name" content="gempak.com" />
  <meta property="og:description"
    content="Selalu Bantu Orang Buat Umrah, Inul Buat Kerana Tanggungjawab Bukan Populariti" />
  <meta property="twitter:site" content="gempak" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url"
    content="https://de-gempak-web-portal-dev.eco.astro.com.my/indonesia/selalu-bantu-orang-buat-umrah-inul-buat-kerana-tanggungjawab-bukan-populariti-29465">
  <meta property="twitter:title"
    content="Selalu Bantu Orang Buat Umrah, Inul Buat Kerana Tanggungjawab Bukan Populariti" />
  <meta property="twitter:description"
    content="Selalu Bantu Orang Buat Umrah, Inul Buat Kerana Tanggungjawab Bukan Populariti" />
  <meta property="twitter:image"
    content="https://d3avoj45mekucs.cloudfront.net/astrogempak/media/gambar/inul-susah.jpg?ext=.jpg" />
  <title>Selalu Bantu Orang Buat Umrah, Inul Buat Kerana Tanggungjawab Bukan Populariti | Gempak</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      font-family: sans-serif;
      margin: 0px;
    }

    a {
      color: #333;
      display: block;
      text-decoration: none;
    }

    img {
      width: 100%;
      height: auto;
    }

    h1 {
      margin: 8px 16px;
      font-size: 24px;
    }

    h2 {
      margin: 8px 16px;
      font-size: 16px;
    }

    header {
      margin-bottom: 16px;
      z-index: 1;
    }

    header,
    footer {
      display: flex;
      width: 100%;
      overflow: scroll;
      padding: 20px 15px;
      background: rgb(255 0 0 / 80%);
      position: sticky;
      top: 0px;
      backdrop-filter: blur(5px);
    }

    header a,
    footer a {
      white-space: nowrap;
      padding-right: 25px;
      color: #fff;
      text-transform: uppercase;
    }

    footer {
      margin-top: 32px;
    }

    a img {
      filter: blur(1px);
      opacity: 0;
      transition-duration: 400ms;
    }

    [itemprop="datePublished"] {
      font-size: 12px !important;
      color: #999;
    }

    .article-body * {
      all: unset;
    }

    .article-body a {
      color: rgb(1, 60, 166);
    }




    article a,
    article .election-party {
      display: grid;
      grid-template-areas:
        'image image image title title'
        'image image image decription decription'
        'image image image decription decription'
        'image image image stamp stamp';
      margin: 16px 16px 0px;
      position: relative;
      z-index: 0;
    }

    article a::after,
    article a::before {
      content: attr(data-duration);
      font-size: 12px;
      position: absolute;
      background: #000;
      color: #fff;
      padding: 0px 4px;
      box-sizing: border-box;
      top: calc((50vw - 32px)*9/16);
      left: calc(50vw - 32px);
      transform: translate(-100%, -100%);
      border-radius: 0px 0px 5px 0px;
    }

    article a::before {
      content: attr(data-image-count);
    }

    article a img,
    article .election-party img {
      grid-area: image;
      border-radius: 5px;
      width: calc(50vw - 32px) !important;
      height: calc((50vw - 32px) * 9 / 16) !important;
      object-fit: cover;
      border: 1px solid #eaeaea;
    }

    article a h2,
    article .election-party h2 {
      grid-area: title;
      margin: 0px 0px 0px 8px;
      line-break: anywhere;
      min-width: calc(50vw);
    }

    article a div:nth-child(3),
    article .election-party div:nth-child(3) {
      grid-area: decription;
      font-size: 14px;
      margin: 8px;
    }

    article a div:nth-child(4) {
      grid-area: stamp;
      font-size: 12px;
      color: #999;
      margin: 0px 8px;
    }

    article .election-party img {
      object-fit: contain;
    }

    .brand-masthead {
      padding: 16px;
      font-size: 0px;
    }

    .brand-masthead div {
      background: rgb(240, 240, 240);
      font-size: 14px;
      padding: 8px;
      line-height: 1.4;
    }

    iframe {
      width: 100%;
      max-width: 100%;
      height: calc(100vw * 9 / 16);
      border: 0px;
    }

    article div:nth-child(1) {
      padding: 8px 0px 4px;
      font-size: 12px;
      color: #999;
    }

    .main-image {
      margin-top: 16px;
    }

    .main-image div {
      padding: 16px;
      font-size: 16px;
      margin: -4px -16px 16px;
      background: #eaeaea;
      font-style: italic;
    }

    article div img {
      margin: 0px -16px 0px;
      width: 100vw !important;
    }

    article {
      padding: 0px 16px;
    }

    article a {
      margin: 16px 0px;
    }

    img.ApiceSx,
    img.ApiceDx {
      display: none !important;
    }

    .article-body img {
      max-width: 100%;
      margin: 16px 0px;
      height: auto !important;
    }

    .article-tags {
      display: flex;
      flex-wrap: wrap;
      padding: 16px 0px 0px;
    }

    .article-tags a {
      margin-right: 16px;
      margin: 0px 8px 8px 0px;
      font-weight: bold;
      color: rgb(1, 60, 166)
    }
  </style>
  <script>
    function onImageLoad() {
      var target = event.target;
      target.style.filter = 'none';
      target.style.opacity = 1;
    }
    function onImageError() {
      event.target.src = 'https://pngimage.net/wp-content/uploads/2018/05/astro-gempak-logo-png.png';
    }
  </script>
</head>

<body>
  <header><a class="" href="/" title="UTAMA">UTAMA</a><a class="" href="/video-terkini" title="VIDEO">VIDEO</a><a
      class="" href="https://de-rancangan-dev.eco.astro.com.my/pmtepikakgee" title="PMTepiKakGee">PMTepiKakGee</a><a
      class="" href="https://de-rancangan-dev.eco.astro.com.my/salam-muslim" title="SALAM MUSLIM">SALAM MUSLIM</a><a
      class="" href="/intrend" title="INTREND">INTREND</a><a class="" href="/gempakchingu" title="CHINGU">CHINGU</a><a
      class="" href="/drebar" title="DREBAR">DREBAR</a><a class="" href="/gempakspot" title="GEMPAK SPOT">GEMPAK
      SPOT</a><a class="" href="/peraduan" title="PERADUAN">PERADUAN</a><a class=""
      href="https://de-rancangan-dev.eco.astro.com.my/" title="Program">Program</a></header>
  <h1>Selalu Bantu Orang Buat Umrah, Inul Buat Kerana Tanggungjawab Bukan Populariti</h1>
  <h2>Selalu Bantu Orang Buat Umrah, Inul Buat Kerana Tanggungjawab Bukan Populariti</h2>
  <article>
    <div>Fiza Kamarudin</div>
    <div>Fri Nov 29 2019</div>
    <div title="Selalu Bantu Orang Buat Umrah, Inul Buat Kerana Tanggungjawab Bukan Populariti" class="main-image">
      <img onload="onImageLoad()" onerror="onImageError()"
        src="https://d3avoj45mekucs.cloudfront.net/astrogempak/media/gambar/inul-susah.jpg?ext=.jpg"
        title="Selalu Bantu Orang Buat Umrah, Inul Buat Kerana Tanggungjawab Bukan Populariti"
        alt="Selalu Bantu Orang Buat Umrah, Inul Buat Kerana Tanggungjawab Bukan Populariti" />



    </div>
    <div class="article-body">Juri Maharaja Lawak Mega (MLM) 2019, Inul Daratista baru-baru ini telah menaja salah
      seorang peserta Dangdut Academy Asia (DAA) mengerjakan umrah.<br /> <br /> Inul ketika ditemui Gempak berkata, itu
      bukanlah kali pertama dia menghulurkan bantuan kepada yang memerlukan, kerana baginya rezeki adalah milik Allah
      SWT dan perlu dikongsi.<br /> <br /> “Saya hanya mengenali peserta tersebut di pentas DAA dan terpanggil untuk
      membantu dia. Itu sahaja.<br /> “Tak ada niat apa-apa, jauh sekali mencari publisiti atau populariti. Saya hanya
      terasa nak bantu. Saya hanya berpegang pada satu, bersedekahlah jika kita ada kemampuan,” katanya.<br /> <br />
      Sementara itu mengulas mengenai tangisannya ketika kumpulan RARE membuat persembahan, Inul berkata dia pernah
      hidup susah.<br /> <br /> “Saya pernah hidup susah. Ibu pernah menggoreng telur dadar hanya menggunakan dua biji
      telur dan kemudiannya dibahagikan kepada tujuh bahagian.<br /> <br /> “Persembahan RARE buat saya terkenang
      kembali kenangan lampau ketika pernah melalui saat sukar dalam hidup dulu.<br /> <br /> “Malah selepas berkahwin
      saya dan suami lalui kehidupan susah. Macam-macam….” katanya merendah diri.<br /> <br /> Inul minggu lalu
      mengalirkan air mata ketika menonton persembahan RARE dan perkara tersebut menjadi perhatian penonton di Dewan
      Teater Shah Alam dan di rumah.<br /> <br /> MLM2019 disiarkan secara langsung menerusi saluran Astro Warna (132)
      dan Warna HD (124) pada setiap Jumaat bermula 1 November lalu.<br /> <br /> Untuk mengundi, undian boleh dilakukan
      secara:<br /> 1.Undian boleh dilakukan di gempak.com/maharajalawakmega<br /> 2.Undian SMS: Taip ML<jarak>NAMA
        KUMPULAN atau ML
          <jarak>NAMA KUMPULAN untuk 3/5/10/20 undian ke 32777.<br /> <br /> Persaingan minggu ini akan diteruskan oleh
            kumpulan J-Born, Bocey, Zero, Smart, Rare, Stone, Rahmet, Jambus, Puteh dan Rojak.<br /> <br /> Program yang
            dihoskan oleh Datuk AC Mizal itu menggabungkan pelawak daripada Malaysia, Indonesia, Singapura dan Brunei,
            bersama-sama berentap untuk merebut gelaran Juara dan membawa pulang hadiah wang tunai berjumlah
            RM500,000.<br /> <br /> Untuk perkembangan terkini MLM2019, layari gempak.com/maharajalawakmega<br /> </div>
    <div class="article-tags"><a class="" href="/topic/mlm2019" title="#MLM2019">#MLM2019</a><a class=""
        href="/topic/inul" title="#Inul">#Inul</a></div>
    <a title="[Official Montage] The House Musim Ke-6 - Ezurin Khyra"
      href="https://de-gempak-web-portal-dev.eco.astro.com.my/video-terkini/official-montage-house-musim-ke-6-ezurin-khyra-1871684">
      <img onload="onImageLoad()" onerror="onImageError()"
        src="https://dzu2r3t0ymp2a.cloudfront.net/360/TranscodedFile/18187827391602665807366/1871684_4113991691602665920461_640x390.jpg"
        title="[Official Montage] The House Musim Ke-6 - Ezurin Khyra"
        alt="[Official Montage] The House Musim Ke-6 - Ezurin Khyra" />
      <h2>[Official Montage] The House Musim Ke-6 - Ezurin Khyra</h2>
      <div>Musim terbaru program realiti ‘The House’ bakal pamer sisi lain ikon fesyen EZURIN KHYRA.

        Ezurin merupakan seorang sosialit 'A-list', ibu kepada lima orang cahaya mata yang sangat dikenali dengan gaya
        hidup glamor dan sering mengembara ke seluruh dunia.

        The House akan membawa ikon sosialit berpengaruh ini bersama ahli keluarganya menyahut cabaran untuk keluar dari
        zon selesa dan menyesuaikan diri dengan kehidupan sederhana.</div>

    </a>
    <a title="SK magic - The Masked Singer Malaysia | EP4"
      href="https://de-gempak-web-portal-dev.eco.astro.com.my/video-terkini/sk-magic-masked-singer-malaysia-ep4-1871549">
      <img onload="onImageLoad()" onerror="onImageError()"
        src="https://dzu2r3t0ymp2a.cloudfront.net/360/TranscodedFile/31384701681602593590332/1871549_8967789641602593686388_640x390.jpg"
        title="SK magic - The Masked Singer Malaysia | EP4" alt="SK magic - The Masked Singer Malaysia | EP4" />
      <h2>SK magic - The Masked Singer Malaysia | EP4</h2>
      <div>Jom kita saksikan moment bersama SK magic di The Masked Singer Malaysia EP4 dengan hos Gempak Live+ Izzue
        Islam dan Elly Arifin sambi bermain pelbagai game dan cabaran serta menemu bual peserta-peserta Masked Singer.
      </div>

    </a>
    <a title="EVA - Bulan CInta | Gegar Vaganza 7 - Minggu 1"
      href="https://de-gempak-web-portal-dev.eco.astro.com.my/video-terkini/eva-bulan-cinta-gegar-vaganza-7-minggu-1-1871410">
      <img onload="onImageLoad()" onerror="onImageError()"
        src="https://dzu2r3t0ymp2a.cloudfront.net/360/TranscodedFile/15356741041602511164748/1871410_8967789641602513067106_640x390.jpg"
        title="EVA - Bulan CInta | Gegar Vaganza 7 - Minggu 1" alt="EVA - Bulan CInta | Gegar Vaganza 7 - Minggu 1" />
      <h2>EVA - Bulan CInta | Gegar Vaganza 7 - Minggu 1</h2>
      <div>Antara salah satu penyanyi dangdut berkumpulan yang pernah wujud di Malaysia. Adakah kumpulan EVA akan
        membuat pentas lebih panas dengan aura dangdut tahun ini?</div>

    </a>
    <a title="Noraniza Idris - Dondang Dendang & Dikir Puteri | Gegar Vaganza 7 | Minggu 1"
      href="https://de-gempak-web-portal-dev.eco.astro.com.my/video-terkini/noraniza-idris-dondang-dendang-dikir-puteri-gegar-vaganza-7-minggu-1-1871409">
      <img onload="onImageLoad()" onerror="onImageError()"
        src="https://dzu2r3t0ymp2a.cloudfront.net/360/TranscodedFile/15797699161602511164751/1871409_8967789641602512919201_640x390.jpg"
        title="Noraniza Idris - Dondang Dendang & Dikir Puteri | Gegar Vaganza 7 | Minggu 1"
        alt="Noraniza Idris - Dondang Dendang & Dikir Puteri | Gegar Vaganza 7 | Minggu 1" />
      <h2>Noraniza Idris - Dondang Dendang & Dikir Puteri | Gegar Vaganza 7 | Minggu 1</h2>
      <div>Ratu Etnik Kreatif dan terkenal dengan trademark pentas yang meriah. Agak-agak berapa bas Kak Ani bawa penari
        untuk GV tahun ni.</div>

    </a>
    <a title="Mus - Sendiri & Biru Mata Hitamku | Gegar Vaganza 7 - Minggu 1"
      href="https://de-gempak-web-portal-dev.eco.astro.com.my/video-terkini/mus-sendiri-biru-mata-hitamku-gegar-vaganza-7-minggu-1-1871408">
      <img onload="onImageLoad()" onerror="onImageError()"
        src="https://dzu2r3t0ymp2a.cloudfront.net/360/TranscodedFile/26012817821602511164749/1871408_8967789641602512760486_640x390.jpg"
        title="Mus - Sendiri & Biru Mata Hitamku | Gegar Vaganza 7 - Minggu 1"
        alt="Mus - Sendiri & Biru Mata Hitamku | Gegar Vaganza 7 - Minggu 1" />
      <h2>Mus - Sendiri & Biru Mata Hitamku | Gegar Vaganza 7 - Minggu 1</h2>
      <div>Legenda rock tanah air, Mus yang berbadan kecil tapi suara yang teramat mantap. Ramai menantikan Mus untuk GV
        tahun ini.</div>

    </a>
    <a title="Linda Nanuwil - Jika Kau Kekasih"
      href="https://de-gempak-web-portal-dev.eco.astro.com.my/video-terkini/linda-nanuwil-jika-kau-kekasih-1871407">
      <img onload="onImageLoad()" onerror="onImageError()"
        src="https://dzu2r3t0ymp2a.cloudfront.net/360/TranscodedFile/16202921231602511164755/1871407_8967789641602512660165_640x390.jpg"
        title="Linda Nanuwil - Jika Kau Kekasih" alt="Linda Nanuwil - Jika Kau Kekasih" />
      <h2>Linda Nanuwil - Jika Kau Kekasih</h2>
      <div>Bekas peserta Akademi Fantasia 2 dan bekas pelajar Tok Ram. Linda masih aktif sebagai penyanyi di Sabah.
      </div>

    </a>
    <a title="Yantzen - Tiada Lagi Aku & Insan | Gegar Vaganza 7 - Minggu 1"
      href="https://de-gempak-web-portal-dev.eco.astro.com.my/video-terkini/yantzen-tiada-lagi-aku-insan-gegar-vaganza-7-minggu-1-1871406">
      <img onload="onImageLoad()" onerror="onImageError()"
        src="https://dzu2r3t0ymp2a.cloudfront.net/360/TranscodedFile/15087120931602510268597/1871406_8967789641602512581583_640x390.jpg"
        title="Yantzen - Tiada Lagi Aku & Insan | Gegar Vaganza 7 - Minggu 1"
        alt="Yantzen - Tiada Lagi Aku & Insan | Gegar Vaganza 7 - Minggu 1" />
      <h2>Yantzen - Tiada Lagi Aku & Insan | Gegar Vaganza 7 - Minggu 1</h2>
      <div>Bekas vokalis Rusty Blade ni tak perlu diperkenalkan lagi. Intro lagu Insan saja boleh membuatkan insan-insan
        bersedia nak menyanyi bersama.</div>

    </a>
    <a title="Indigo - Istimewa | Gegar Vaganza 7 - Minggu 1"
      href="https://de-gempak-web-portal-dev.eco.astro.com.my/video-terkini/indigo-istimewa-gegar-vaganza-7-minggu-1-1871405">
      <img onload="onImageLoad()" onerror="onImageError()"
        src="https://dzu2r3t0ymp2a.cloudfront.net/360/TranscodedFile/10090948181602510268677/1871405_8967789641602512141251_640x390.jpg"
        title="Indigo - Istimewa | Gegar Vaganza 7 - Minggu 1" alt="Indigo - Istimewa | Gegar Vaganza 7 - Minggu 1" />
      <h2>Indigo - Istimewa | Gegar Vaganza 7 - Minggu 1</h2>
      <div>Menjadi kegilaan gadis-gadis kerana penangan lagu iklan syampu satu ketika dulu, Indigo kini bertiga kembali
        di tahun 2020.</div>

    </a>
    <a title="Oja - Dasira | Gegar Vaganza 7 - Minggu 1"
      href="https://de-gempak-web-portal-dev.eco.astro.com.my/video-terkini/oja-dasira-gegar-vaganza-7-minggu-1-1871404">
      <img onload="onImageLoad()" onerror="onImageError()"
        src="https://dzu2r3t0ymp2a.cloudfront.net/360/TranscodedFile/20106704791602510268684/1871404_8967789641602512042230_640x390.jpg"
        title="Oja - Dasira | Gegar Vaganza 7 - Minggu 1" alt="Oja - Dasira | Gegar Vaganza 7 - Minggu 1" />
      <h2>Oja - Dasira | Gegar Vaganza 7 - Minggu 1</h2>
      <div>Anak saudara kepada penyanyi yang terkenal dengan lagu Apo Kono Eh Jang, Mastura. Oja yang terkenal dengan
        lagu Dasira membawa cabaran dalam GV7 tahun ini</div>

    </a>
    <a title="Aju Success - Ku Basuh Luka Dengan Air Mata | Gegar Vaganza 7 - Minggu 1"
      href="https://de-gempak-web-portal-dev.eco.astro.com.my/video-terkini/aju-success-ku-basuh-luka-dengan-air-mata-gegar-vaganza-7-minggu-1-1871403">
      <img onload="onImageLoad()" onerror="onImageError()"
        src="https://dzu2r3t0ymp2a.cloudfront.net/360/TranscodedFile/9258518341602510268692/1871403_8967789641602511912774_640x390.jpg"
        title="Aju Success - Ku Basuh Luka Dengan Air Mata | Gegar Vaganza 7 - Minggu 1"
        alt="Aju Success - Ku Basuh Luka Dengan Air Mata | Gegar Vaganza 7 - Minggu 1" />
      <h2>Aju Success - Ku Basuh Luka Dengan Air Mata | Gegar Vaganza 7 - Minggu 1</h2>
      <div>Anggota kumpulan Success yang pernah popular tahun 90 an . Kini Aju secara solo akan mengembalikan zaman
        kegemilangan kumpulan Success.</div>

    </a>
  </article>
  <footer><a class="" href="https://www.astro.com.my/privacy" title="Polisi Privasi">Polisi Privasi</a><a class=""
      href="https://www.astro.com.my/terms" title="Terma Penggunaan">Terma Penggunaan</a><a class=""
      href="https://corporate.astro.com.my/" title="Pelabur">Pelabur</a><a class=""
      href="https://www.facebook.com/PortalAstroGempak" title="Facebook">Facebook</a><a class=""
      href="https://instagram.com/astrogempak" title="Instagram">Instagram</a><a class=""
      href="https://twitter.com/astro_gempak" title="Twitter">Twitter</a><a class=""
      href="https://www.youtube.com/AstroGempak" title="Youtube">Youtube</a></footer>
  <script
    type="application/ld+json">{"@context":"http://schema.org","@type":"WebPage","headline":"Selalu Bantu Orang Buat Umrah, Inul Buat Kerana Tanggungjawab Bukan Populariti","creator":"Gempak","thumbnailUrl":"https://d3avoj45mekucs.cloudfront.net/astrogempak/media/gambar/inul-susah.jpg?ext=.jpg","keywords":"#MLM2019,#Inul"}</script>
  <script
    type="application/ld+json">{"name":"Gempak","url":"https://de-gempak-web-portal-dev.eco.astro.com.my","logo":"https://pngimage.net/wp-content/uploads/2018/05/astro-gempak-logo-png.png","sameAs":["https://www.facebook.com/gempak","https://twitter.com/gempak","https://www.instagram.com/gempak/","https://www.youtube.com/gempak","http://www.gempak.com/"],"@context":"https://schema.org","@type":"Organization"}</script>
</body>

</html>`;

console.log(main(html));