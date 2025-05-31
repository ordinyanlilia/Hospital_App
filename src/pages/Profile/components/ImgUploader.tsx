import type {GetProp, UploadProps} from 'antd';
import {Flex, message, Upload} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import type {UploadFile} from 'antd/es/upload/interface';
import type {RcFile, UploadChangeParam} from "antd/lib/upload";


const ImgUploader = ({imageUrl, onSetFormData}: { imageUrl: string, onSetFormData: (url: string) => void }) => {
    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

    const uploadButton = (
        <button style={{border: 0, background: "none"}} type="button">
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </button>
    );


    const handleImgUploadChange = async (info: UploadChangeParam<UploadFile>) => {
        const file = info.file;

        if (file.status === 'removed') {
            onSetFormData('');
            return
        } else if (file.status === 'error') {
            message.error(`${file.name} file upload failed.`);
        }

        const formData = new FormData();
        formData.append("image", file.originFileObj as RcFile);

        const apiKey = "235bac975049560ecbf592acddc541e0";

        const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const dataObj = await response.json();
        onSetFormData(dataObj.data.url);
    };

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    return (
        <Flex justify="center" align="center" style={{minHeight: "120px"}}>
            <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                onChange={handleImgUploadChange}
                beforeUpload={beforeUpload}
                fileList={
                    imageUrl
                        ? [
                            {
                                uid: "-1",
                                name: "avatar.png",
                                status: "done",
                                url: imageUrl,
                            },
                        ]
                        : []
                }
            >
                {!imageUrl && uploadButton}
            </Upload>
        </Flex>
    )
}

export default ImgUploader;