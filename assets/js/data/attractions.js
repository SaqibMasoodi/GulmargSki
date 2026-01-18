/**
 * Attractions Data Source
 * Used in index.html (Attractions Tabs)
 */

export const attractionsData = [
    {
        id: 'gondola',
        title: 'Gondola Cable Car',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>',
        content: `
            <div class="p-8 lg:p-10 h-full flex flex-col">
                <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">World's 2nd Highest Cable Car</h3>
                <p class="text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed max-w-2xl">The highlight of any trip. Rise from the pine forests to the naked peaks in minutes.</p>

                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors group">
                        <div class="flex justify-between items-center mb-4">
                            <h4 class="text-lg font-black text-slate-900 dark:text-white uppercase">Phase 1</h4>
                            <span class="text-[10px] bg-slate-900 text-white font-bold px-2 py-1 rounded">8,500 ft</span>
                        </div>
                        <p class="text-xs text-blue-600 dark:text-blue-400 mb-3 font-bold uppercase tracking-wider">Gulmarg to Kongdoori</p>
                        <p class="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Takes you to a bowl-shaped valley. Features restaurants, snow parks, and the main beginner slopes.</p>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors relative overflow-hidden group">
                        <div class="flex justify-between items-center mb-4 relative z-10">
                            <h4 class="text-lg font-black text-slate-900 dark:text-white uppercase">Phase 2</h4>
                            <span class="text-[10px] bg-blue-600 text-white font-bold px-2 py-1 rounded">14,000 ft</span>
                        </div>
                        <p class="text-xs text-blue-600 dark:text-blue-400 mb-3 font-bold uppercase tracking-wider relative z-10">To Apharwat Peak</p>
                        <p class="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed relative z-10">The main event. Breathtaking views of Nanga Parbat. <br><span class="text-red-500 font-bold text-xs mt-2 block">*Sightseeing or Experts Only.</span></p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'thrill',
        title: 'Snowmobile & ATV',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>',
        content: `
            <div class="p-8 lg:p-10 h-full flex flex-col">
                <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tight">Adrenaline Without Skis</h3>
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 aspect-[4/3]">
                        <img src="assets/images/home/attractions/gondola.jpg" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Snowmobile">
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6 flex flex-col justify-end">
                            <h4 class="text-xl font-bold text-white mb-1">Snowmobiles</h4>
                            <p class="text-slate-300 text-xs font-medium mb-3">High-speed motorized sleds. Zoom across vast frozen snowfields.</p>
                        </div>
                    </div>
                    <div class="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 aspect-[4/3]">
                        <img src="https://images.unsplash.com/photo-1625902047808-72b157b88950?q=80&w=2670&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="ATV">
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6 flex flex-col justify-end">
                            <h4 class="text-xl font-bold text-white mb-1">ATV (Quad Bikes)</h4>
                            <p class="text-slate-300 text-xs font-medium mb-3">4x4 beasts with tire chains. Explore Tangmarg to Drung.</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'sightseeing',
        title: 'Sightseeing',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>',
        content: `
            <div class="p-8 lg:p-10 h-full flex flex-col">
                <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Iconic Spots</h3>
                <p class="text-slate-500 dark:text-slate-400 mb-8 font-medium">The "Must-Visit" locations for every traveler.</p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group">
                        <div class="h-32 rounded-lg bg-slate-200 dark:bg-slate-800 mb-4 overflow-hidden">
                            <img src="assets/images/home/attractions/waterfall.jpg" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Waterfall">
                        </div>
                        <h4 class="text-lg font-bold text-slate-900 dark:text-white mb-1">Drung Waterfall</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">Famous frozen waterfall (Jan/Feb).</p>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group">
                        <div class="h-32 rounded-lg bg-slate-200 dark:bg-slate-800 mb-4 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1548625361-288295b927a4?q=80&w=2669&auto=format&fit=crop" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Church">
                        </div>
                        <h4 class="text-lg font-bold text-slate-900 dark:text-white mb-1">St. Mary’s Church</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">100+ year old Victorian church.</p>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group">
                        <div class="h-32 rounded-lg bg-slate-200 dark:bg-slate-800 mb-4 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1570176461466-4c7b80a568a0?q=80&w=2670&auto=format&fit=crop" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Temple">
                        </div>
                        <h4 class="text-lg font-bold text-slate-900 dark:text-white mb-1">Maharani Temple</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">Red-roofed Shiva temple on a hill.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'explore',
        title: 'Beyond Gulmarg',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>',
        content: `
            <div class="p-8 lg:p-10 h-full flex flex-col">
                <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Complete Your Itinerary</h3>
                <div class="space-y-8">
                    <div class="flex gap-6 group">
                        <div class="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl shrink-0 group-hover:bg-blue-600 transition-colors">DL</div>
                        <div>
                            <h4 class="text-xl font-bold text-slate-900 dark:text-white">Srinagar (Dal Lake)</h4>
                            <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">2 hours away. The classic experience is a Shikara ride on the frozen lake and a Houseboat stay.</p>
                        </div>
                    </div>
                    <div class="w-px h-8 bg-slate-200 dark:bg-slate-700 ml-8"></div>
                    <div class="flex gap-6 group">
                        <div class="w-16 h-16 rounded-full bg-white border-2 border-slate-200 dark:border-slate-700 text-slate-900 flex items-center justify-center font-bold text-xl shrink-0 group-hover:border-blue-600 group-hover:text-blue-600 transition-colors">PH</div>
                        <div>
                            <h4 class="text-xl font-bold text-slate-900 dark:text-white">Pahalgam</h4>
                            <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">"Valley of Shepherds." Famous for scenic rivers and pine forests.</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'heli',
        title: 'Helicopter Rides',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>',
        content: `
            <div class="p-8 lg:p-10 h-full flex flex-col">
                <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Sky-High Adventure</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto no-scrollbar pr-2 pb-2">
                    
                    <!-- Joint Ride -->
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors group flex flex-col h-full">
                        <div>
                            <div class="flex justify-between items-start mb-2">
                                <h4 class="text-lg font-black text-slate-900 dark:text-white uppercase leading-tight">Joint<br>Ride</h4>
                            </div>
                            <p class="text-xs text-blue-600 dark:text-blue-400 mb-4 font-bold uppercase tracking-wider">Aerial Sightseeing</p>
                            <ul class="text-sm text-slate-600 dark:text-slate-400 font-medium space-y-2 mb-6">
                                <li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span><span>No landing included</span></li>
                                <li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span><span>Panoramic aerial views</span></li>
                            </ul>
                        </div>
                        <div class="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                             <span class="block text-xl font-black text-slate-900 dark:text-white">₹9,000</span>
                             <span class="text-xs text-slate-500 font-bold uppercase">per person</span>
                        </div>
                    </div>

                    <!-- Commodore Ride -->
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors group relative overflow-hidden flex flex-col h-full">
                        <div class="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Bestseller</div>
                        <div>
                            <div class="flex justify-between items-start mb-2">
                                <h4 class="text-lg font-black text-slate-900 dark:text-white uppercase leading-tight">Commodore<br>Ride</h4>
                            </div>
                            <p class="text-xs text-blue-600 dark:text-blue-400 mb-4 font-bold uppercase tracking-wider">Landing Experience</p>
                            <ul class="text-sm text-slate-600 dark:text-slate-400 font-medium space-y-2 mb-6">
                                <li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span><span>Landing included</span></li>
                                <li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span><span>Explore on foot</span></li>
                            </ul>
                        </div>
                        <div class="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                             <span class="block text-xl font-black text-slate-900 dark:text-white">₹12,000</span>
                             <span class="text-xs text-slate-500 font-bold uppercase">per person</span>
                        </div>
                    </div>

                    <!-- Sunshine Peak -->
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-400 transition-colors group border-b-4 border-b-amber-400 md:border-b-0 md:border-l-4 md:border-l-amber-400 flex flex-col h-full">
                        <div>
                            <div class="flex justify-between items-start mb-2">
                                <h4 class="text-lg font-black text-slate-900 dark:text-white uppercase leading-tight">Sunshine<br>Peak</h4>
                            </div>
                            <p class="text-xs text-amber-500 mb-4 font-bold uppercase tracking-wider">Premium Route</p>
                            <ul class="text-sm text-slate-600 dark:text-slate-400 font-medium space-y-2 mb-6">
                                <li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span><span>Mountain landing</span></li>
                                <li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span><span>Extended flight time</span></li>
                            </ul>
                        </div>
                        <div class="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                             <span class="block text-xl font-black text-slate-900 dark:text-white">₹15,000</span>
                             <span class="text-xs text-slate-500 font-bold uppercase">per person</span>
                        </div>
                    </div>

                </div>
            </div>
        `
    },
    {
        id: 'sledging',
        title: 'Sledging',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>',
        content: `
            <div class="p-8 lg:p-10 h-full flex flex-col">
                <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">Classic Snow Fun</h3>
                <p class="text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed max-w-2xl">Experience the timeless joy of sledging down Gulmarg's snowy slopes.</p>
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors group">
                        <h4 class="font-bold text-lg text-slate-900 dark:text-white mb-2 uppercase">Traditional Sledge</h4>
                        <p class="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-4">Wooden sleds pulled or pushed by local guides on gentle slopes. Perfect for families and beginners.</p>
                        <div class="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                            <span class="block text-xl font-black text-slate-900 dark:text-white">₹500 - ₹1,000</span>
                            <span class="text-xs text-slate-500 font-bold uppercase">per ride</span>
                        </div>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors group">
                        <h4 class="font-bold text-lg text-slate-900 dark:text-white mb-2 uppercase">Tube Sledging</h4>
                        <p class="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-4">Inflatable tube rides for a faster, more thrilling descent. Available at Phase 1 Gondola area.</p>
                        <div class="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                            <span class="block text-xl font-black text-slate-900 dark:text-white">₹300 - ₹500</span>
                            <span class="text-xs text-slate-500 font-bold uppercase">per ride</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
];
