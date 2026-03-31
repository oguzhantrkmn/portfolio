"use client";
import React, { useState } from 'react';
import './cv-download.css';

const CvDownloadButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    
    // Yükleme sırasında tekrar tıklanmasını önleyelim
    if (isChecked) return; 
    
    setIsChecked(checked);

    if (checked) {
      setTimeout(() => {
        // PDF'in programatik olarak tetiklenerek indirilmesi (href kullanıcının public klasöründe olan yol)
        const link = document.createElement("a");
        link.href = "/Oğuzhan_TÜRKMEN_CV.pdf";
        link.download = "Oğuzhan_TÜRKMEN_CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Uzun süreli bekleme (3 saniye sonra butonu sıfırlayalım)
        setTimeout(() => {
           setIsChecked(false);
        }, 3000);

      }, 3900); // 3.9 sn animasyon süresi
    }
  };

  return (
    <div className="cv-download-container">
      <label className="cv-label">
        <input 
            type="checkbox" 
            className="cv-input" 
            checked={isChecked}
            onChange={handleChange}
        />
        <span className="cv-circle"><svg className="cv-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19V5m0 14-4-4m4 4 4-4" />
          </svg>
          <div className="cv-square" />
        </span>
        <p className="cv-title tracking-wide font-medium">CV İndir</p>
        <p className="cv-title tracking-wide font-medium text-emerald-400">İndirildi</p>
      </label>
    </div>
  );
}

export default CvDownloadButton;
