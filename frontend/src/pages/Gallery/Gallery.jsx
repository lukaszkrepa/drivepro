import React from 'react';
import GalleryHero from './GalleryHero';
import GalleryCategories from './GalleryCategories';
import GalleryGrid from './GalleryGrid';
import LoadMoreButton from './LoadMoreButton';

const GalleryPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <GalleryHero />
            <GalleryCategories />
            <GalleryGrid />
            <LoadMoreButton />
        </div>
    );
};

export default GalleryPage;