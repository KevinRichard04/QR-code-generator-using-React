import React from 'react'
import { useState } from 'react'

export const QrCode = () => {

  const[img, SetImg] = useState("")
  const[loading, SetLoading]= useState(false)
  const[qrData, SetQrData] = useState("")
  const[qrSize, SetQrSize] = useState("")
   async function generateQr() {
    SetLoading(true)
    try{
      const url =`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
      SetImg(url)
    }
    catch(error){
      console.error("Error Generating Qr code", error);
    }
      finally{
        SetLoading(false)
      }
    }
    function downloadQr(){
      fetch(img)
        .then((Response) => Response.blob())
        .then((blob) => 
        {
          const link = document.createElement("a")
          link.href = URL.createObjectURL(blob)
          link.download= "qr-code.png"
          document.body.appendChild(link);
          link.click()
          document.body.removeChild(link)
        }
        );
    }

  return (
    <div className='app-container'> 
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait...</p>}
      {img && <img src={img} className='qr-code-image'/>}
      <div>
        <label htmlFor="dataInput" className='input-label' >
          Data For QR Code 
        </label>
        <input type="text" value={qrData} id="dataInput" placeholder="Enter Data For QR Code" onChange={(e)=>SetQrData(e.target.value)}  />
        <label htmlFor="sizeInput" className='input-label'>
          Image Size(e.g 150)
        </label>
        <input type="text" value={qrSize} id="sizeInput" placeholder='Enter Image Size' onChange={(e)=>SetQrSize(e.target.value)} />
        <button className='generate-button' disabled={loading} onClick={generateQr} >Generate QR code</button>
        <button className='download-button' onClick={downloadQr}>Download QR code</button>
      </div>
      <p className='footer'>Designed by <a href='https://github.com/KevinRichard04' target="_blank">Kevin Richard</a></p>
    </div>
  )
}
