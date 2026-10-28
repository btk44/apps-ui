import { ActivityCategory } from '../models/activity-category';
import type { ActivitySearchItem } from '../models/activity-search-item';
import { ActivityTarget } from '../models/activity-target';

function makeDate(month: number, day: number, hour: number, minute: number): Date {
	return new Date(2026, month - 1, day, hour, minute, 0, 0);
}

export const activitySearchItems: ActivitySearchItem[] = [
	{
		id: 1,
		name: 'Sunrise Yoga in Riverside Park',
		description: 'A guided outdoor yoga session designed to energize the body and calm the mind before the day begins.',
		mapUrl: 'https://maps.google.com/?q=Riverside+Park+New+York',
		url: 'https://example.com/activities/sunrise-yoga-riverside-park',
		startDate: makeDate(9, 3, 7, 30),
		endDate: makeDate(9, 3, 9, 0),
		categories: [ActivityCategory.Outdoors, ActivityCategory.Fitness, ActivityCategory.Relaxation],
		targets: [ActivityTarget.All, ActivityTarget.Adults]
	},
	{
		id: 2,
		name: 'Downtown Food Truck Festival',
		description: 'Browse a lively mix of local food trucks, artisanal snacks, and live acoustic performances.',
		mapUrl: 'https://maps.google.com/?q=Downtown+Food+Truck+Festival',
		url: 'https://example.com/activities/downtown-food-truck-festival',
		startDate: makeDate(9, 4, 12, 0),
		endDate: makeDate(9, 4, 18, 30),
		categories: [ActivityCategory.Food, ActivityCategory.Social, ActivityCategory.Entertainment],
		targets: [ActivityTarget.Families, ActivityTarget.All]
	},
	{
		id: 3,
		name: 'Community Garden Volunteer Morning',
		description: 'Help plant seasonal herbs and flowers while meeting neighbors and learning sustainable gardening tips.',
		mapUrl: 'https://maps.google.com/?q=Community+Garden+Center',
		url: 'https://example.com/activities/community-garden-volunteer-morning',
		startDate: makeDate(9, 5, 9, 15),
		endDate: makeDate(9, 5, 11, 45),
		categories: [ActivityCategory.Community, ActivityCategory.Volunteer, ActivityCategory.Nature],
		targets: [ActivityTarget.Families, ActivityTarget.Seniors]
	},
	{
		id: 4,
		name: 'Creative Pottery Workshop',
		description: 'Shape clay pieces under the guidance of local artists and take home a handmade keepsake.',
		mapUrl: 'https://maps.google.com/?q=Art+Studio+Downtown',
		url: 'https://example.com/activities/creative-pottery-workshop',
		startDate: makeDate(9, 6, 14, 0),
		endDate: makeDate(9, 6, 16, 30),
		categories: [ActivityCategory.Arts, ActivityCategory.Indoor, ActivityCategory.Education],
		targets: [ActivityTarget.Adults, ActivityTarget.Children]
	},
	{
		id: 5,
		name: 'Evening Jazz at the Harbor',
		description: 'Enjoy an open-air evening of live jazz, waterfront views, and light bites by the docks.',
		mapUrl: 'https://maps.google.com/?q=Harbor+Jazz+Stage',
		url: 'https://example.com/activities/evening-jazz-at-the-harbor',
		startDate: makeDate(9, 7, 19, 0),
		endDate: makeDate(9, 7, 21, 30),
		categories: [ActivityCategory.Music, ActivityCategory.Entertainment, ActivityCategory.Outdoors],
		targets: [ActivityTarget.Adults, ActivityTarget.All]
	},
	{
		id: 6,
		name: 'Family Bike Tour',
		description: 'A beginner-friendly cycling route with scenic stops, local stories, and rest breaks along the way.',
		mapUrl: 'https://maps.google.com/?q=Riverfront+Bike+Path',
		url: 'https://example.com/activities/family-bike-tour',
		startDate: makeDate(9, 8, 10, 0),
		endDate: makeDate(9, 8, 12, 30),
		categories: [ActivityCategory.Sports, ActivityCategory.Outdoors, ActivityCategory.Adventure],
		targets: [ActivityTarget.Families, ActivityTarget.Children]
	},
	{
		id: 7,
		name: 'Neighborhood Makers Market',
		description: 'Discover handcrafted goods, small-batch design items, and local creators in a vibrant open market.',
		mapUrl: 'https://maps.google.com/?q=Maker+Market+Square',
		url: 'https://example.com/activities/neighborhood-makers-market',
		startDate: makeDate(9, 9, 11, 0),
		endDate: makeDate(9, 9, 15, 0),
		categories: [ActivityCategory.Shopping, ActivityCategory.Community, ActivityCategory.Entertainment],
		targets: [ActivityTarget.All, ActivityTarget.Families]
	},
	{
		id: 8,
		name: 'Interactive Science Fair',
		description: 'Hands-on exhibitions, experiment stations, and demonstrations that bring science to life for all ages.',
		mapUrl: 'https://maps.google.com/?q=Science+Center+Expo+Hall',
		url: 'https://example.com/activities/interactive-science-fair',
		startDate: makeDate(9, 10, 13, 0),
		endDate: makeDate(9, 10, 17, 0),
		categories: [ActivityCategory.Education, ActivityCategory.Technology, ActivityCategory.Indoor],
		targets: [ActivityTarget.Children, ActivityTarget.Families]
	},
	{
		id: 9,
		name: 'Wellness Walk and Tea Circle',
		description: 'Join a slow-paced walking group followed by calming tea and mindfulness reflection.',
		mapUrl: 'https://maps.google.com/?q=Botanic+Garden+Walkway',
		url: 'https://example.com/activities/wellness-walk-and-tea-circle',
		startDate: makeDate(9, 11, 8, 45),
		endDate: makeDate(9, 11, 10, 45),
		categories: [ActivityCategory.Health, ActivityCategory.Nature, ActivityCategory.Relaxation],
		targets: [ActivityTarget.Seniors, ActivityTarget.Adults]
	},
	{
		id: 10,
		name: 'Sunset Kayak Session',
		description: 'Glide across the lake at golden hour with an experienced guide and a calm, scenic route.',
		mapUrl: 'https://maps.google.com/?q=Lakeview+Kayak+Launch',
		url: 'https://example.com/activities/sunset-kayak-session',
		startDate: makeDate(9, 12, 17, 30),
		endDate: makeDate(9, 12, 19, 30),
		categories: [ActivityCategory.Outdoors, ActivityCategory.Sports, ActivityCategory.Adventure],
		targets: [ActivityTarget.Adults, ActivityTarget.All]
	},
	{
		id: 11,
		name: 'Heritage Museum Tour',
		description: 'Explore local history through a curated gallery walk and live storytelling from volunteers.',
		mapUrl: 'https://maps.google.com/?q=City+Heritage+Museum',
		url: 'https://example.com/activities/heritage-museum-tour',
		startDate: makeDate(9, 13, 10, 30),
		endDate: makeDate(9, 13, 12, 0),
		categories: [ActivityCategory.Education, ActivityCategory.Indoor, ActivityCategory.Community],
		targets: [ActivityTarget.Seniors, ActivityTarget.Families]
	},
	{
		id: 12,
		name: 'Open Air Cinema Night',
		description: 'Bring a blanket for a cozy outdoor movie under the stars with snacks and community seating.',
		mapUrl: 'https://maps.google.com/?q=Central+Park+Screen',
		url: 'https://example.com/activities/open-air-cinema-night',
		startDate: makeDate(9, 14, 20, 15),
		endDate: makeDate(9, 14, 22, 45),
		categories: [ActivityCategory.Entertainment, ActivityCategory.Outdoors, ActivityCategory.Social],
		targets: [ActivityTarget.Families, ActivityTarget.All]
	},
	{
		id: 13,
		name: 'Beginner Salsa Social',
		description: 'Learn the basics of salsa in a friendly group session and practice with rotating partners.',
		mapUrl: 'https://maps.google.com/?q=Grand+Hall+Dance+Studio',
		url: 'https://example.com/activities/beginner-salsa-social',
		startDate: makeDate(9, 15, 18, 30),
		endDate: makeDate(9, 15, 20, 30),
		categories: [ActivityCategory.Music, ActivityCategory.Sports, ActivityCategory.Social],
		targets: [ActivityTarget.Adults, ActivityTarget.All]
	},
	{
		id: 14,
		name: 'Photography Walk Through Old Town',
		description: 'Capture street scenes, artwork, and hidden corners with a guided local photography session.',
		mapUrl: 'https://maps.google.com/?q=Old+Town+Historic+District',
		url: 'https://example.com/activities/photography-walk-through-old-town',
		startDate: makeDate(9, 16, 9, 0),
		endDate: makeDate(9, 16, 11, 30),
		categories: [ActivityCategory.Arts, ActivityCategory.Travel, ActivityCategory.Outdoors],
		targets: [ActivityTarget.Adults, ActivityTarget.All]
	},
	{
		id: 15,
		name: 'Mural Painting Meetup',
		description: 'Collaborate on a public mural project while learning color blending and creative teamwork.',
		mapUrl: 'https://maps.google.com/?q=North+Wall+Community+Art+Space',
		url: 'https://example.com/activities/mural-painting-meetup',
		startDate: makeDate(9, 17, 11, 30),
		endDate: makeDate(9, 17, 15, 0),
		categories: [ActivityCategory.Arts, ActivityCategory.Community, ActivityCategory.Outdoors],
		targets: [ActivityTarget.Children, ActivityTarget.Families]
	},
	{
		id: 16,
		name: 'Forest Trail Hiking Club',
		description: 'Explore shaded forest paths with a pace-friendly group excursion designed for new hikers.',
		mapUrl: 'https://maps.google.com/?q=Forest+Trail+Conservation+Park',
		url: 'https://example.com/activities/forest-trail-hiking-club',
		startDate: makeDate(9, 18, 8, 30),
		endDate: makeDate(9, 18, 11, 15),
		categories: [ActivityCategory.Nature, ActivityCategory.Outdoors, ActivityCategory.Fitness],
		targets: [ActivityTarget.All, ActivityTarget.Adults]
	},
	{
		id: 17,
		name: 'Healthy Cooking Class',
		description: 'Prepare seasonal dishes with a nutrition-minded chef and learn practical meal planning skills.',
		mapUrl: 'https://maps.google.com/?q=Green+Kitchen+Studio',
		url: 'https://example.com/activities/healthy-cooking-class',
		startDate: makeDate(9, 19, 17, 0),
		endDate: makeDate(9, 19, 19, 0),
		categories: [ActivityCategory.Food, ActivityCategory.Education, ActivityCategory.Health],
		targets: [ActivityTarget.Adults, ActivityTarget.Families]
	},
	{
		id: 18,
		name: 'Board Game Cafe Social',
		description: 'Spend an evening playing strategy favorites and casual classics in a cozy cafe setting.',
		mapUrl: 'https://maps.google.com/?q=Board+Game+Cafe+Lantern',
		url: 'https://example.com/activities/board-game-cafe-social',
		startDate: makeDate(9, 20, 18, 45),
		endDate: makeDate(9, 20, 21, 15),
		categories: [ActivityCategory.Social, ActivityCategory.Indoor, ActivityCategory.Entertainment],
		targets: [ActivityTarget.Families, ActivityTarget.Children]
	},
	{
		id: 19,
		name: 'Local History Lecture',
		description: 'Hear a local historian share stories about the town’s growth, landmarks, and community traditions.',
		mapUrl: 'https://maps.google.com/?q=Library+Community+Hall',
		url: 'https://example.com/activities/local-history-lecture',
		startDate: makeDate(9, 21, 18, 0),
		endDate: makeDate(9, 21, 19, 30),
		categories: [ActivityCategory.Education, ActivityCategory.Community, ActivityCategory.Indoor],
		targets: [ActivityTarget.Seniors, ActivityTarget.Adults]
	},
	{
		id: 20,
		name: 'Pet Adoption Day',
		description: 'Meet adoptable pets, learn care basics, and connect with local rescue volunteers.',
		mapUrl: 'https://maps.google.com/?q=Humane+Society+Center',
		url: 'https://example.com/activities/pet-adoption-day',
		startDate: makeDate(9, 22, 10, 0),
		endDate: makeDate(9, 22, 14, 0),
		categories: [ActivityCategory.Community, ActivityCategory.Social, ActivityCategory.Volunteer],
		targets: [ActivityTarget.Families, ActivityTarget.All]
	},
	{
		id: 21,
		name: 'City Bike Repair Clinic',
		description: 'Get maintenance tips, quick tune-ups, and expert advice for making your bike ride-ready.',
		mapUrl: 'https://maps.google.com/?q=Cycle+Repair+Workshop',
		url: 'https://example.com/activities/city-bike-repair-clinic',
		startDate: makeDate(9, 23, 15, 30),
		endDate: makeDate(9, 23, 17, 30),
		categories: [ActivityCategory.Sports, ActivityCategory.Technology, ActivityCategory.Education],
		targets: [ActivityTarget.Adults, ActivityTarget.All]
	},
	{
		id: 22,
		name: 'Rooftop Stargazing Event',
		description: 'Look up at the night sky with telescopes, astronomy guides, and relaxed rooftop seating.',
		mapUrl: 'https://maps.google.com/?q=Rooftop+Observatory+Deck',
		url: 'https://example.com/activities/rooftop-stargazing-event',
		startDate: makeDate(9, 24, 20, 0),
		endDate: makeDate(9, 24, 22, 0),
		categories: [ActivityCategory.Nature, ActivityCategory.Education, ActivityCategory.Outdoors],
		targets: [ActivityTarget.All, ActivityTarget.Children]
	},
	{
		id: 23,
		name: 'Indoor Rock Climbing Session',
		description: 'Challenge yourself on beginner-friendly routes with supportive coaching and a welcoming atmosphere.',
		mapUrl: 'https://maps.google.com/?q=Summit+Climbing+Center',
		url: 'https://example.com/activities/indoor-rock-climbing-session',
		startDate: makeDate(9, 25, 18, 0),
		endDate: makeDate(9, 25, 20, 0),
		categories: [ActivityCategory.Sports, ActivityCategory.Fitness, ActivityCategory.Indoor],
		targets: [ActivityTarget.Adults, ActivityTarget.Children]
	},
	{
		id: 24,
		name: 'Market Fresh Brunch Walk',
		description: 'Stroll through the farmers market, sample local produce, and enjoy a casual brunch stop.',
		mapUrl: 'https://maps.google.com/?q=Farmers+Market+Square',
		url: 'https://example.com/activities/market-fresh-brunch-walk',
		startDate: makeDate(9, 26, 9, 30),
		endDate: makeDate(9, 26, 11, 30),
		categories: [ActivityCategory.Food, ActivityCategory.Outdoors, ActivityCategory.Social],
		targets: [ActivityTarget.Families, ActivityTarget.All]
	},
	{
		id: 25,
		name: 'Lakeside Meditation Session',
		description: 'Unwind with breathwork, guided mindfulness, and a calm shoreline reset in a supportive group.',
		mapUrl: 'https://maps.google.com/?q=Lake+Loop+Meditation+Point',
		url: 'https://example.com/activities/lakeside-meditation-session',
		startDate: makeDate(9, 27, 7, 15),
		endDate: makeDate(9, 27, 8, 15),
		categories: [ActivityCategory.Health, ActivityCategory.Relaxation, ActivityCategory.Nature],
		targets: [ActivityTarget.Adults, ActivityTarget.Seniors]
	},
	{
		id: 26,
		name: 'Senior Gentle Mobility Class',
		description: 'A low-impact movement class focused on strength, balance, and comfortable stretching.',
		mapUrl: 'https://maps.google.com/?q=Community+Wellness+Center',
		url: 'https://example.com/activities/senior-gentle-mobility-class',
		startDate: makeDate(9, 28, 9, 45),
		endDate: makeDate(9, 28, 10, 45),
		categories: [ActivityCategory.Fitness, ActivityCategory.Health, ActivityCategory.Indoor],
		targets: [ActivityTarget.Seniors, ActivityTarget.All]
	},
	{
		id: 27,
		name: 'Kids Coding Lab',
		description: 'Explore beginner coding concepts through games, puzzles, and simple digital projects.',
		mapUrl: 'https://maps.google.com/?q=Innovation+Learning+Lab',
		url: 'https://example.com/activities/kids-coding-lab',
		startDate: makeDate(9, 29, 11, 0),
		endDate: makeDate(9, 29, 13, 0),
		categories: [ActivityCategory.Technology, ActivityCategory.Education],
		targets: [ActivityTarget.Children, ActivityTarget.Families]
	},
	{
		id: 28,
		name: 'Night Market Food Crawl',
		description: 'Sample from dozens of stalls featuring street snacks, desserts, and handcrafted drinks.',
		mapUrl: 'https://maps.google.com/?q=Lantern+Night+Market',
		url: 'https://example.com/activities/night-market-food-crawl',
		startDate: makeDate(9, 30, 18, 30),
		endDate: makeDate(9, 30, 22, 0),
		categories: [ActivityCategory.Food, ActivityCategory.Entertainment, ActivityCategory.Social],
		targets: [ActivityTarget.All, ActivityTarget.Adults]
	},
	{
		id: 29,
		name: 'Neighborhood Cleanup Day',
		description: 'Join volunteers to refresh public spaces, plant greenery, and keep the area tidy and welcoming.',
		mapUrl: 'https://maps.google.com/?q=Riverfront+Cleanup+Zone',
		url: 'https://example.com/activities/neighborhood-cleanup-day',
		startDate: makeDate(10, 1, 9, 0),
		endDate: makeDate(10, 1, 12, 0),
		categories: [ActivityCategory.Volunteer, ActivityCategory.Community, ActivityCategory.Nature],
		targets: [ActivityTarget.Families, ActivityTarget.All]
	},
	{
		id: 30,
		name: 'Acoustic Guitar Jam',
		description: 'Bring your instrument or just listen as a relaxed group plays folk and indie favorites.',
		mapUrl: 'https://maps.google.com/?q=Bluebird+Cafe+Stage',
		url: 'https://example.com/activities/acoustic-guitar-jam',
		startDate: makeDate(10, 2, 18, 15),
		endDate: makeDate(10, 2, 20, 15),
		categories: [ActivityCategory.Music, ActivityCategory.Social, ActivityCategory.Indoor],
		targets: [ActivityTarget.Adults, ActivityTarget.All]
	},
	{
		id: 31,
		name: 'Botanical Garden Discovery Tour',
		description: 'Learn about native plants, seasonal blooms, and hidden garden paths during a curated walk.',
		mapUrl: 'https://maps.google.com/?q=Botanical+Discovery+Garden',
		url: 'https://example.com/activities/botanical-garden-discovery-tour',
		startDate: makeDate(10, 3, 10, 15),
		endDate: makeDate(10, 3, 12, 0),
		categories: [ActivityCategory.Nature, ActivityCategory.Education, ActivityCategory.Outdoors],
		targets: [ActivityTarget.Families, ActivityTarget.Seniors]
	},
	{
		id: 32,
		name: 'DIY Candle Workshop',
		description: 'Mix fragrances, pour custom candles, and take home a handcrafted scent for your home.',
		mapUrl: 'https://maps.google.com/?q=Elm+Street+Craft+Studio',
		url: 'https://example.com/activities/diy-candle-workshop',
		startDate: makeDate(10, 4, 16, 30),
		endDate: makeDate(10, 4, 18, 30),
		categories: [ActivityCategory.Arts, ActivityCategory.Indoor, ActivityCategory.Social],
		targets: [ActivityTarget.Adults, ActivityTarget.Families]
	},
	{
		id: 33,
		name: 'Outdoor Circuit Fitness',
		description: 'A dynamic bodyweight workout with mobility drills, bursts of cardio, and easy-to-follow coaching.',
		mapUrl: 'https://maps.google.com/?q=North+Field+Fitness+Zone',
		url: 'https://example.com/activities/outdoor-circuit-fitness',
		startDate: makeDate(10, 5, 18, 0),
		endDate: makeDate(10, 5, 19, 15),
		categories: [ActivityCategory.Fitness, ActivityCategory.Outdoors, ActivityCategory.Sports],
		targets: [ActivityTarget.Adults, ActivityTarget.All]
	},
	{
		id: 34,
		name: 'Storytelling Circle for Families',
		description: 'Share tales, sing songs, and enjoy a cozy format designed for little ones and their grown-ups.',
		mapUrl: 'https://maps.google.com/?q=Maple+Library+Children+Corner',
		url: 'https://example.com/activities/storytelling-circle-for-families',
		startDate: makeDate(10, 6, 10, 0),
		endDate: makeDate(10, 6, 11, 30),
		categories: [ActivityCategory.Education, ActivityCategory.Community, ActivityCategory.Social],
		targets: [ActivityTarget.Children, ActivityTarget.Families]
	},
	{
		id: 35,
		name: 'Farm Visit and Harvest Tour',
		description: 'Meet local growers, sample fresh produce, and learn about seasonal farm practices.',
		mapUrl: 'https://maps.google.com/?q=Sunfield+Farm+Tours',
		url: 'https://example.com/activities/farm-visit-and-harvest-tour',
		startDate: makeDate(10, 7, 9, 30),
		endDate: makeDate(10, 7, 12, 30),
		categories: [ActivityCategory.Travel, ActivityCategory.Food, ActivityCategory.Nature],
		targets: [ActivityTarget.Families, ActivityTarget.All]
	},
	{
		id: 36,
		name: 'Winter Market Craft Fair',
		description: 'Browse handmade goods, seasonal decor, and small-batch crafts from local artisans.',
		mapUrl: 'https://maps.google.com/?q=Winter+Craft+Hall',
		url: 'https://example.com/activities/winter-market-craft-fair',
		startDate: makeDate(10, 8, 12, 0),
		endDate: makeDate(10, 8, 17, 0),
		categories: [ActivityCategory.Shopping, ActivityCategory.Arts, ActivityCategory.Community],
		targets: [ActivityTarget.All, ActivityTarget.Families]
	},
	{
		id: 37,
		name: 'Sunset Picnic and Live Music',
		description: 'Bring a blanket and enjoy acoustic sets while eating picnic favorites in the green space.',
		mapUrl: 'https://maps.google.com/?q=Hilltop+Picnic+Lawn',
		url: 'https://example.com/activities/sunset-picnic-and-live-music',
		startDate: makeDate(10, 9, 18, 30),
		endDate: makeDate(10, 9, 21, 0),
		categories: [ActivityCategory.Music, ActivityCategory.Food, ActivityCategory.Outdoors],
		targets: [ActivityTarget.All, ActivityTarget.Families]
	},
	{
		id: 38,
		name: 'Digital Detox Weekend Retreat',
		description: 'Take time offline with guided reflection, nature walks, and simple restorative workshops.',
		mapUrl: 'https://maps.google.com/?q=Hillside+Retreat+Center',
		url: 'https://example.com/activities/digital-detox-weekend-retreat',
		startDate: makeDate(10, 10, 9, 0),
		endDate: makeDate(10, 10, 16, 0),
		categories: [ActivityCategory.Relaxation, ActivityCategory.Nature, ActivityCategory.Health],
		targets: [ActivityTarget.Adults, ActivityTarget.Seniors]
	},
	{
		id: 39,
		name: 'Coastal Walk and Tide Pool Study',
		description: 'Explore shoreline ecology and coastal wildlife while enjoying a scenic oceanfront walk.',
		mapUrl: 'https://maps.google.com/?q=Coastal+Nature+Reserve',
		url: 'https://example.com/activities/coastal-walk-and-tide-pool-study',
		startDate: makeDate(10, 11, 8, 30),
		endDate: makeDate(10, 11, 11, 15),
		categories: [ActivityCategory.Nature, ActivityCategory.Education, ActivityCategory.Outdoors],
		targets: [ActivityTarget.All, ActivityTarget.Families]
	},
	{
		id: 40,
		name: 'Just for Laughs Comedy Club',
		description: 'Enjoy an evening of stand-up and improv from local comedians in a lively venue.',
		mapUrl: 'https://maps.google.com/?q=Comedy+Club+District',
		url: 'https://example.com/activities/just-for-laughs-comedy-club',
		startDate: makeDate(10, 12, 19, 30),
		endDate: makeDate(10, 12, 21, 45),
		categories: [ActivityCategory.Entertainment, ActivityCategory.Social, ActivityCategory.Indoor],
		targets: [ActivityTarget.Adults, ActivityTarget.All]
	},
	{
		id: 41,
		name: 'Creative Writing Circle',
		description: 'Share prompts, practice storytelling, and build confidence in a warm peer-led workshop.',
		mapUrl: 'https://maps.google.com/?q=Open+Book+Reading+Room',
		url: 'https://example.com/activities/creative-writing-circle',
		startDate: makeDate(10, 13, 17, 30),
		endDate: makeDate(10, 13, 19, 15),
		categories: [ActivityCategory.Arts, ActivityCategory.Education, ActivityCategory.Social],
		targets: [ActivityTarget.Adults, ActivityTarget.Seniors]
	},
	{
		id: 42,
		name: 'Trail Run for Beginners',
		description: 'A motivating, low-pressure route with pacing support and a friendly community atmosphere.',
		mapUrl: 'https://maps.google.com/?q=Meadow+Trail+Start',
		url: 'https://example.com/activities/trail-run-for-beginners',
		startDate: makeDate(10, 14, 8, 0),
		endDate: makeDate(10, 14, 9, 30),
		categories: [ActivityCategory.Sports, ActivityCategory.Outdoors, ActivityCategory.Fitness],
		targets: [ActivityTarget.Adults, ActivityTarget.All]
	},
	{
		id: 43,
		name: 'Community Art Swap',
		description: 'Trade original pieces, discover unique works, and connect with local makers and collectors.',
		mapUrl: 'https://maps.google.com/?q=North+Studio+Exchange',
		url: 'https://example.com/activities/community-art-swap',
		startDate: makeDate(10, 15, 13, 0),
		endDate: makeDate(10, 15, 16, 0),
		categories: [ActivityCategory.Arts, ActivityCategory.Community, ActivityCategory.Shopping],
		targets: [ActivityTarget.All, ActivityTarget.Adults]
	},
	{
		id: 44,
		name: 'Group Tai Chi Session',
		description: 'Move gently through breath-led sequences that build balance, calmness, and energy.',
		mapUrl: 'https://maps.google.com/?q=Park+Garden+Pavilion',
		url: 'https://example.com/activities/group-tai-chi-session',
		startDate: makeDate(10, 16, 7, 45),
		endDate: makeDate(10, 16, 9, 0),
		categories: [ActivityCategory.Fitness, ActivityCategory.Health, ActivityCategory.Outdoors],
		targets: [ActivityTarget.Seniors, ActivityTarget.All]
	},
	{
		id: 45,
		name: 'Science Museum Family Day',
		description: 'Explore exhibits, take part in live demos, and enjoy family-friendly learning activities.',
		mapUrl: 'https://maps.google.com/?q=National+Science+Museum',
		url: 'https://example.com/activities/science-museum-family-day',
		startDate: makeDate(10, 17, 11, 0),
		endDate: makeDate(10, 17, 15, 0),
		categories: [ActivityCategory.Education, ActivityCategory.Technology, ActivityCategory.Community],
		targets: [ActivityTarget.Children, ActivityTarget.Families]
	},
	{
		id: 46,
		name: 'Tea Tasting and Pairing',
		description: 'Sample small-batch teas and light pairings while learning about flavor notes and brewing styles.',
		mapUrl: 'https://maps.google.com/?q=Golden+Leaf+Tea+House',
		url: 'https://example.com/activities/tea-tasting-and-pairing',
		startDate: makeDate(10, 18, 15, 30),
		endDate: makeDate(10, 18, 17, 0),
		categories: [ActivityCategory.Food, ActivityCategory.Social, ActivityCategory.Education],
		targets: [ActivityTarget.Adults, ActivityTarget.All]
	},
	{
		id: 47,
		name: 'Schoolyard Soccer Clinic',
		description: 'Coach-led drills and small games that build confidence and teamwork for younger players.',
		mapUrl: 'https://maps.google.com/?q=Westfield+School+Pitch',
		url: 'https://example.com/activities/schoolyard-soccer-clinic',
		startDate: makeDate(10, 19, 16, 0),
		endDate: makeDate(10, 19, 17, 30),
		categories: [ActivityCategory.Sports, ActivityCategory.Community],
		targets: [ActivityTarget.Children, ActivityTarget.Families]
	},
	{
		id: 48,
		name: 'Garden Workshop: Seed Saving',
		description: 'Learn practical seed-saving techniques for sustainable gardening and healthier home plots.',
		mapUrl: 'https://maps.google.com/?q=Urban+Growers+Collective',
		url: 'https://example.com/activities/garden-workshop-seed-saving',
		startDate: makeDate(10, 20, 10, 30),
		endDate: makeDate(10, 20, 12, 0),
		categories: [ActivityCategory.Education, ActivityCategory.Nature, ActivityCategory.Community],
		targets: [ActivityTarget.Adults, ActivityTarget.Families]
	},
	{
		id: 49,
		name: 'Live Poetry Evening',
		description: 'A warm reading room featuring local poets, open mics, and reflective performances.',
		mapUrl: 'https://maps.google.com/?q=Harbor+Reading+Room',
		url: 'https://example.com/activities/live-poetry-evening',
		startDate: makeDate(10, 21, 19, 0),
		endDate: makeDate(10, 21, 21, 0),
		categories: [ActivityCategory.Arts, ActivityCategory.Music, ActivityCategory.Social],
		targets: [ActivityTarget.Adults, ActivityTarget.All]
	},
	{
		id: 50,
		name: 'Sunday Brunch Social Club',
		description: 'Meet new people over a leisurely brunch, live music, and a relaxed neighborhood gathering.',
		mapUrl: 'https://maps.google.com/?q=Maple+Square+Brunch+Club',
		url: 'https://example.com/activities/sunday-brunch-social-club',
		startDate: makeDate(10, 22, 10, 30),
		endDate: makeDate(10, 22, 13, 0),
		categories: [ActivityCategory.Food, ActivityCategory.Social, ActivityCategory.Community],
		targets: [ActivityTarget.All, ActivityTarget.Families]
	}
];

export const mockActivitySearchItems = activitySearchItems;

export default activitySearchItems;
