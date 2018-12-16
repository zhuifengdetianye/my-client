// @flow

import type { FileField } from './formType'

import React from 'react'
import { postFormData } from 'projects/cnode/lib/apiClient'

export type ImageProps = {
  url: string,
  originWidth: number,
  originHeight: number
}

type Props = {
  field: FileField,
  image: ?ImageProps,
  onChange: (img: ?ImageProps) => void
}

export default class FileInput extends React.PureComponent<Props> {
  onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const files: FileList = e.currentTarget.files
    const file: ?File = files && files.item(0)
    if (file) {
      const type = file.type
      if (type.indexOf('image') !== 0) {
        // alert弹出框（待定）
        alert('只能选择图片')
      }

      // get width & height
      var image = new Image()
      image.src = (window.URL || window.webkitURL).createObjectURL(file)
      image.onload = () => {
        const { width: originWidth, height: originHeight } = image

        //upload
        postFormData('/common/uploadFile', {
          file
        }).then(url => {
          this.props.onChange({
            url,
            originWidth,
            originHeight
          })
        }).catch(e => console.log(e))
      }
    }
  }
  render () {
    const { image ,field = {} } = this.props
    const { title = '图片' } = field
    return (
      <div>
        <span>{title}</span>
        <div>
          <input type='file' accept='image/*' onChange={this.onChange} />
          {image &&
            image.url && (
            <i
              onClick={() => {
                this.props.onChange(null)
              }}
              className='fa fa-times'
              style={{ fontSize:'13px',marginLeft:'10px' }}
            />
          )}
        </div>
        {image && (
          <div style={{ display: 'flex', marginTop: 5 }}>
            <div
              style={{
                width: 100,
                height: 50,
                backgroundImage: `url(${image.url})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'
              }}
            />
            <div style={{ marginLeft: 10, lineHeight: '20px' }}>
              宽: {image.originWidth}
              <br />高: {image.originHeight}
            </div>
          </div>
        )}
      </div>
    )
  }
}
