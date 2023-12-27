import React from 'react'

import { Image, Transformation } from 'cloudinary-react'

const Cloudinary_Image = ({ public_id, width="600", height="400" }) => {
    return (
        <Image cloudName="dsv6hvwxa" secure='true' upload_preset="odysseyMediaAssets" publicId={public_id} >
            <Transformation effect="trim" crop="scale" width={width} height={height}/>
        </Image>
    )
}

export default Cloudinary_Image