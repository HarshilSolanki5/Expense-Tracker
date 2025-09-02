import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';

const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
  return (
    <div>ProfilePhotoSelector</div>
  )
}

export default ProfilePhotoSelector