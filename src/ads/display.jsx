import { useEffect } from "react";

export const AdSenseDisplay = () => {
  useEffect(() => {
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9861275063686425"
     crossorigin="anonymous"></script>
    const adsbygoogleScript = document.createElement("script");
    adsbygoogleScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    adsbygoogleScript.async = true;
    adsbygoogleScript.setAttribute("data-ad-client", "ca-pub-9861275063686425"); 
    document.head.appendChild(adsbygoogleScript);

    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: "block", borderColor:'red' }}
        data-ad-client="ca-pub-9861275063686425"  
        data-ad-slot="7590107251"      
        data-adtest ='on'
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};
