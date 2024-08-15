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
                setCardData(data); // Assuming the API response has a `reviews` array
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
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 960, // tablet breakpoint
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600, // mobile breakpoint
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
                </Slider>
            </Grid>
        </Grid>
    );
};

export default Widget;
