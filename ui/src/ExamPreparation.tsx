import React, {useState} from 'react';
import {Skeleton, Tabs, TabsProps, FloatButton} from 'antd';
import ReactMarkdown from 'react-markdown';
import CreateExamPreparation from "./CreateExamPreparation";
import {Configuration, ExamApi} from "./api-client";
import {SkeletonParagraphProps} from "antd/es/skeleton/Paragraph";

const ExamPreparation = () => {

    const props: SkeletonParagraphProps = {rows: 20}
    const [content, setContent] = useState("")
    const [showModal, setShowModal] = useState(true)
    const [editValues] = useState({})
    const [loading, setLoading] = useState(false)
    const [exam, setExam] = useState(Object)

    const defaultApi = new ExamApi(new Configuration({
        basePath: "http://localhost:8000",
    }));

    const onCreate = async (values: any) => {
        setShowModal(false)
        setLoading(true)
        let result = await defaultApi.sendExamPreparationRequest(
            {
                daysForPreparation: values["days"],
                hoursPerDay: values["hours"],
                examContext: values["topic"],
                examField: values["field"]
            }
        )
        setLoading(false)
        setExam(result.data)
        setContent(result.data["learningPlan"])
    }

    const items: TabsProps['items'] = [
        {
            key: 'learningPlan',
            label: `Lernplan`,
            children: <ReactMarkdown>{content}</ReactMarkdown>
        },
        {
            key: 'sampleExam',
            label: `Übungsarbeit`,
            children: <ReactMarkdown>{content}</ReactMarkdown>
        },
        {
            key: 'sampleSolution',
            label: `Musterlösung`,
            children: <ReactMarkdown>{content}</ReactMarkdown>
        },
    ];

    const onChange = (key: string ) => {
        setContent(exam[key])
    };
    if(loading) {
        return (
            <div>
            <Skeleton active={true} paragraph={props}/>
            </div>
    )
    } else {

        return (
            <div>
                <CreateExamPreparation open={showModal} onCreate={(values: any) => onCreate(values)}
                                       values={editValues}></CreateExamPreparation>
                <Tabs defaultActiveKey="learningPlan" items={items} onChange={onChange}/>
                <FloatButton onClick={() => setShowModal(true)} />
            </div>
        );
    }
}

export default ExamPreparation
