from controller_models import ExamPreparationRequest, ExamPreparation
from openai_integration import init_assistant, Message, MessageRole, conversation


def create_learning_plan_prompt(body: ExamPreparationRequest):
    return Message(
        role=MessageRole.USER,
        content=f"""
Ich möchte mich auf eine Klassenarbeit im Bereich {body.examField} vorbereiten.
Das Themen der Arbeit lassen sich wie folgt zusammenfassen:
{body.examContext}

Die Arbeit findet in {body.daysForPreparation} Tagen statt.
Ich möchte pro Tag {body.hoursPerDay} Stunden lernen.
Ich benötige einen detaillierten Lernplan, der meinen Bedürfnissen entspricht.
Ich erwarte das folgende Format:

# Lernplan
...
"""
    )


def create_sample_exam_prompt():
    return Message(
        role=MessageRole.USER,
        content=f"""
Bitte erstelle mir eine anspruchsvolle Übungsarbeit zur Vorbereitung.
Ich erwarte folgendes Format:

# Übungsarbeit
...
"""
    )


def create_sample_solution_prompt():
    return Message(
        role=MessageRole.USER,
        content=f"""
Bitte erstelle mir eine Musterlösung zu Deiner Übungsarbeit.
Ich erwarte folgendes Format:

# Musterlösung
...
"""
    )


def send_exam_preparation_request(body: ExamPreparationRequest):
    messages = init_assistant()
    messages.append(create_learning_plan_prompt(body))
    messages = conversation(messages)
    preparation = messages[-1].content

    messages.append(create_sample_exam_prompt())
    messages = conversation(messages)
    exam = messages[-1].content

    messages.append(create_sample_solution_prompt())
    messages = conversation(messages)
    solution = messages[-1].content

    result = ExamPreparation(
        learningPlan=preparation,
        sampleExam=exam,
        sampleSolution=solution
    )
    return result
