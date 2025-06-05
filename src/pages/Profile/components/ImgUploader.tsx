import type {GetProp, UploadProps} from 'antd';
import {Flex, message, Upload} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import type {UploadFile} from 'antd/es/upload/interface';
import type {RcFile, UploadChangeParam} from "antd/lib/upload";


const ImgUploader = ({imageUrl, onSetFormData}: { imageUrl: string, onSetFormData: (url: string) => void }) => {
    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
    const [messageApi, contextHolder] = message.useMessage();
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
            messageApi.open({
                type: 'error',
                content: `${file.name} file upload failed.`,
            });
            return;
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
            messageApi.open({
                type: 'error',
                content: 'You can only upload JPG/PNG file!',
            });
            return Upload.LIST_IGNORE;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            messageApi.open({
                type: 'error',
                content: 'Image must smaller than 2MB!',
            });
            return Upload.LIST_IGNORE;
        }
        return true;
    };

    return (
        <Flex justify="center" align="center" style={{minHeight: "120px"}}>
            {contextHolder}
            <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
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