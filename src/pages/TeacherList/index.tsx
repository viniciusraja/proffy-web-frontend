import React, { useState, FormEvent, useEffect} from 'react';

import './styles.css';

import PageHeader from 'components/PageHeader';
import TeacherItem, { Teacher } from 'components/TeacherItem';
import Input from 'components/Input';
import Select from 'components/Select';
import api from 'services/api';


    export default function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        })
        console.log(response.data,'scscscsc')
        setTeachers(response.data);
    }
    useEffect(()=>{
    (async()=>{
        const response = await api.get('classes')
        console.log(response)
        setTeachers(response.data);
    })()
    },[]) 
    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Those are the available teachers." description="Chose your Teacher">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        name="subject" 
                        label="Subject"
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                        options={[
                            { value: 'Arts', label: 'Arts' },
                            { value: 'Biology', label: 'Biology' },
                            { value: 'Sciences', label: 'Sciences' },
                            { value: 'Physical Education', label: 'Physical Education' },
                            { value: 'Physics', label: 'Physics' },
                            { value: 'Geography', label: 'Geography' },
                            { value: 'History', label: 'History' },
                            { value: 'Math', label: 'Math' },
                            { value: 'English', label: 'English' },
                            { value: 'Chemistry', label: 'Chemistry' },
                        ]}
                    />
                    <Select 
                        name="week_day" 
                        label="Day of the week"
                        value={week_day}
                        onChange={(e) => { setWeekDay(e.target.value) }}
                        options={[
                            { value: '0', label: 'Sunday' },
                            { value: '1', label: 'Monday' },
                            { value: '2', label: 'Tuesday' },
                            { value: '3', label: 'Wendnesday' },
                            { value: '4', label: 'Thursday' },
                            { value: '5', label: 'Friday' },
                            { value: '6', label: 'Saturday' },
                        ]}
                    />
                    <Input 
                        type="time" 
                        name="time" 
                        label="Hour" 
                        value={time}
                        onChange={(e) => { setTime(e.target.value) }}
                    />

                    <button onClick={(e)=>searchTeachers(e)} type="submit">
                        Search
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
            </main>
        </div>
    )}