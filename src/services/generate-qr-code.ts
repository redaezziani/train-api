import QRCode from 'qrcode'



export const generateQRCode = (text: string) => {
    return QRCode.toDataURL(text)
}
