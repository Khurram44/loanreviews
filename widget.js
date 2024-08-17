import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Grid, Card, CardContent, Typography, Avatar, CardHeader, Button, Rating } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './widget.css'

const TruncatedText = ({ text, maxLength }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleToggle = () => setIsExpanded(!isExpanded);

    return (
        <Typography variant="body2" color="text.secondary">
            {isExpanded ? text : `${text.substring(0, maxLength)}${text.length > maxLength ? '...' : ''}`}
            {text.length > maxLength && (
                <Button onClick={handleToggle} style={{ padding: '0', textTransform: 'none', marginLeft: '4px', fontSize: 'inherit' }}>
                    {isExpanded ? 'Show less' : 'Show more'}
                </Button>
            )}
        </Typography>
    );
};

const Widget = () => {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://staged-loanshub-96be18a8af38.herokuapp.com/reviews?keywords=application%20portal,loanshub');
                const data = await response.json();
                setCardData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <Grid container spacing={3} justifyContent="center" style={{ padding: '20px' }}>
            <Grid item xs={12}>
                <Slider {...settings}>
                    {cardData.map((card) => (
                        <div key={card.id}>
                            <Card style={{ width: '95%', margin: '0 auto', position: 'relative', paddingBottom: '60px' }}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="reviewer">
                                            {card.reviewer.charAt(0)}
                                        </Avatar>
                                    }
                                    title={card.reviewer}
                                    subheader={<Rating name="read-only" value={card.rating} readOnly size="small" />}
                                    titleTypographyProps={{
                                        variant: 'h6',
                                        style: {
                                            fontWeight: '500',
                                            color: '#000',
                                            fontSize: '14px',
                                        },
                                    }}
                                    subheaderTypographyProps={{
                                        variant: 'body2',
                                        style: {
                                            fontWeight: '400',
                                            color: '#555',
                                            fontSize: '12px',
                                        },
                                    }}
                                />
                                <CardContent>
                                    <TruncatedText text={card.review} maxLength={120} />
                                </CardContent>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"
                                    alt="Google Logo"
                                    style={{
                                        position: 'absolute',
                                        bottom: 8,
                                        right: 8,
                                        width: 50,
                                        height: 'auto',
                                    }}
                                />
                            </Card>
                        </div>
                    ))}
                    {/* Last card with image and button */}
                    <div style={{ marginRight: '15%' }}>
                        <Card style={{ width: '90%', margin: '0 auto', textAlign: 'center', padding: '20px', minHeight: '192px' }}>
                            <img
                                src="https://www.greenworldholidays.com/wp-content/uploads/2019/12/google-verified-reviews.jpg"
                                alt="Placeholder"
                                style={{ width: '220px', height: '110px', margin: 'auto' }}
                            />
                            <Button variant="contained" color="primary" style={{ marginTop: '3%' }}
                                onClick={() => window.open('https://www.google.com/maps/place/loansHub+-+Your+local+home+loan+experts+online/@-24.7593997,114.3099059,4z/data=!4m8!3m7!1s0x6b91592c752fc429:0x8494743c28332fa5!8m2!3d-26.4420923!4d136.013279!9m1!1b1!16s%2Fg%2F11gzqbnppv?entry=ttu', '_blank')}
                            >
                                View All Reviews
                            </Button>
                        </Card>
                    </div>
                </Slider>
            </Grid>
        </Grid>
    );
};

export default Widget;
