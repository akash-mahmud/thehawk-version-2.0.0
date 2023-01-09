import sharp from 'sharp'

const convertWebp = async (buffer) => {
return await sharp(buffer).rotate().resize(700).toBuffer();
}

export default convertWebp;