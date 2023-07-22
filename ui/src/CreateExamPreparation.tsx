import {Form, Input, InputNumber, Modal} from "antd";

const { TextArea } = Input;

const CreateExamPreparation = ({ open, onCreate, values}: any) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Neue Klassenarbeit"
            okText="OK"
            cancelButtonProps={{
                style: {
                    display: "none",
                },
            }}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log("Validate Failed:", info);
                    });
            }}
        >
            <Form fields={values} form={form} layout="vertical" name="form_in_modal">
                <Form.Item
                    name="field"
                    label="Fach"
                    rules={[
                        {
                            required: true,
                            message: "Bitte gib das Fach der Klassenarbeit an.",
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="days"
                    label="Tage zur Vorbereitung"
                    rules={[
                        {
                            required: true,
                            message: "Bitte gib die Anzahl an Tagen für die Vorbereitung an.",
                        },
                    ]}
                >
                    <InputNumber/>
                </Form.Item>

                <Form.Item
                    name="hours"
                    label="Stunden pro Tag zum Lernen"
                    rules={[
                        {
                            required: true,
                            message: "Bitte gib die Anzahl an Stunden an, die Du pro Tag lernen möchtest.",
                        },
                    ]}
                >
                    <InputNumber/>
                </Form.Item>

                <Form.Item
                    name="topic"
                    label="Thema der Klassenarbeit"
                    rules={[
                        {
                            required: true,
                            message: "Bitte gib die Themen an, die in der Klassenarbeit behandelt werden.",
                        },
                    ]}
                >
                    <TextArea rows={8} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default CreateExamPreparation;
