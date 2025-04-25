import { useState , useEffect } from 'react';

const lessons = [
    {
        id: 1,
        name: 'ReactJs là gì. Tại sao lên học ReactJs?'
    },
    {
        id: 2,
        name:'SPA/MPA là gì?'
    },
    {
        id: 3,
        name: 'Arrow function'
    }
]
function Content(){
    const [lessonId, setLessonId] = useState(1);
    const handleLesson = (e)=>{
        console.log(e.detail);
    }

    useEffect(()=>{
        window.addEventListener(`lesson-${lessonId}`,handleLesson)
        return () => window.removeEventListener(`lesson-${lessonId}`,handleLesson)
    },[lessonId])

    return (
        <div>
            <ul>
                {lessons.map(lesson =>
                    <li 
                        key={lesson.id}
                        style={{
                            color: lessonId === lesson.id ? 'red': '#333'
                        }}
                        onClick={() => setLessonId(lesson.id)}
                    >
                        {lesson.name}
                    </li>
                )}
            </ul>
        </div>
    )
}
export default Content;