    import React, { useState, FormEvent } from 'react';
    import { useHistory } from 'react-router-dom';
    
    import PageHeader from 'components/PageHeader';
    
    import './styles.css';
    import Input from 'components/Input';
    import warningIcon from 'assets/images/icons/warning.svg';
    import Textarea from 'components/Textarea';
    import Select from 'components/Select';
    import api from 'services/api';
    
    export default function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
        // console.log(setScheduleItemValue);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Subscription successfully done!');

            history.push('/');
        }).catch(() => {
            alert('Subscription error!');
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="It's incredible that you want to teach."
                description="Firstly fill the subscription form below."
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Your data</legend>

                        <Input 
                            name="name" 
                            label="Complete name" 
                            value={name} 
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <Input 
                            name="avatar" 
                            label="Avatar"
                            value={avatar} 
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <Input 
                            name="whatsapp" 
                            label="WhatsApp"
                            value={whatsapp} 
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />
                        <Textarea 
                            name="bio" 
                            label="Biography" 
                            value={bio} 
                            onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>About the class</legend>

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
                        <Input 
                            name="cost" 
                            label="Cost of your class by hour"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Time availability
                            <button type="button" onClick={addNewScheduleItem}>
                                + New time
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                // <div key={scheduleItem.week_day} className="schedule-item">
                                <div key={index} className="schedule-item">
                                    <Select 
                                        name="week_day" 
                                        label="Day of the week"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                                        name="from" 
                                        label="From" 
                                        type="time" 
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />

                                    <Input 
                                        name="to" 
                                        label="To" 
                                        type="time" 
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />

                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Important warning" />
                            Important <br />
                            Fill all data
                        </p>
                        <button type="submit">
                            Save subscription
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}
