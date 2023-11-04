import { useState } from 'react';
import './News.scss';

function News() {
    const getLocalData = () => {
		const data = localStorage.getItem('posts');
		return data ? JSON.parse(data) : [];
	};

    const [News] = useState(getLocalData());

    return <section className="news">
        {News.map((post, idx) => {
            if(idx >= 3) return null; 
            return (
                <h2 key={idx}>{post.title}</h2>
            )
        })}
    </section>

}

export default News;