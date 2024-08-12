import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Avatar, CardHeader, Button, Rating } from '@mui/material';
import { cardData } from './Data';


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
    return (
        <Grid container spacing={3} justifyContent="left" style={{ padding: '20px' }}>
            {cardData.map((card) => (
                <Grid
                    item
                    key={card.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    style={{
                        display: 'flex',
                        justifyContent: 'left',
                    }}
                >
                    <Card style={{ width: '100%', position: 'relative', paddingBottom: '60px' }}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="reviewer">
                                    {card.reviewer.charAt(0)}
                                </Avatar>
                            }
                            title={card.reviewer}
                            subheader={<Rating name="read-only" value={card.rating} readOnly size="small"/>}
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
                </Grid>
            ))}
        </Grid>
    );
};

export default Widget;
