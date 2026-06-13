const fs = require('fs');

let matches = {};

// ========== GROUP STAGE - MATCHDAY 1 ==========
matches["1"] = { team1: "Mexico", team2: "South Africa", stage: "Group A", date: "June 12, 2026 — 1:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["2"] = { team1: "South Korea", team2: "Czechia", stage: "Group A", date: "June 12, 2026 — 8:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["3"] = { team1: "Canada", team2: "Bosnia & Herzegovina", stage: "Group B", date: "June 13, 2026 — 1:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["4"] = { team1: "United States", team2: "Paraguay", stage: "Group D", date: "June 13, 2026 — 7:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["5"] = { team1: "Qatar", team2: "Switzerland", stage: "Group B", date: "June 14, 2026 — 1:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["6"] = { team1: "Brazil", team2: "Morocco", stage: "Group C", date: "June 14, 2026 — 4:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["7"] = { team1: "Haiti", team2: "Scotland", stage: "Group C", date: "June 14, 2026 — 7:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["8"] = { team1: "Australia", team2: "Türkiye", stage: "Group D", date: "June 14, 2026 — 10:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["9"] = { team1: "Germany", team2: "Curaçao", stage: "Group E", date: "June 14, 2026 — 11:00 PM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["10"] = { team1: "Netherlands", team2: "Japan", stage: "Group F", date: "June 15, 2026 — 2:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["11"] = { team1: "Ivory Coast", team2: "Ecuador", stage: "Group E", date: "June 15, 2026 — 5:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["12"] = { team1: "Sweden", team2: "Tunisia", stage: "Group F", date: "June 15, 2026 — 8:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["13"] = { team1: "Spain", team2: "Cabo Verde", stage: "Group H", date: "June 15, 2026 — 10:00 PM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["14"] = { team1: "Belgium", team2: "Egypt", stage: "Group G", date: "June 16, 2026 — 1:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["15"] = { team1: "Saudi Arabia", team2: "Uruguay", stage: "Group H", date: "June 16, 2026 — 4:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["16"] = { team1: "Iran", team2: "New Zealand", stage: "Group G", date: "June 16, 2026 — 7:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["17"] = { team1: "France", team2: "Senegal", stage: "Group I", date: "June 17, 2026 — 1:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["18"] = { team1: "Iraq", team2: "Norway", stage: "Group I", date: "June 17, 2026 — 4:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["19"] = { team1: "Argentina", team2: "Algeria", stage: "Group J", date: "June 17, 2026 — 7:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["20"] = { team1: "Austria", team2: "Jordan", stage: "Group J", date: "June 17, 2026 — 10:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["21"] = { team1: "Portugal", team2: "Congo DR", stage: "Group K", date: "June 17, 2026 — 11:00 PM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["22"] = { team1: "England", team2: "Croatia", stage: "Group L", date: "June 18, 2026 — 2:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["23"] = { team1: "Ghana", team2: "Panama", stage: "Group L", date: "June 18, 2026 — 5:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["24"] = { team1: "Uzbekistan", team2: "Colombia", stage: "Group K", date: "June 18, 2026 — 8:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };

// ========== GROUP STAGE - MATCHDAY 2 ==========
matches["25"] = { team1: "Czechia", team2: "South Africa", stage: "Group A", date: "June 18, 2026 — 10:00 PM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["26"] = { team1: "Switzerland", team2: "Bosnia & Herzegovina", stage: "Group B", date: "June 19, 2026 — 1:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["27"] = { team1: "Canada", team2: "Qatar", stage: "Group B", date: "June 19, 2026 — 4:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["28"] = { team1: "Mexico", team2: "South Korea", stage: "Group A", date: "June 19, 2026 — 7:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["29"] = { team1: "USA", team2: "Australia", stage: "Group D", date: "June 20, 2026 — 1:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["30"] = { team1: "Scotland", team2: "Morocco", stage: "Group C", date: "June 20, 2026 — 4:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["31"] = { team1: "Brazil", team2: "Haiti", stage: "Group C", date: "June 20, 2026 — 6:30 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["32"] = { team1: "Türkiye", team2: "Paraguay", stage: "Group D", date: "June 20, 2026 — 9:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["33"] = { team1: "Netherlands", team2: "Sweden", stage: "Group F", date: "June 20, 2026 — 11:00 PM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["34"] = { team1: "Germany", team2: "Ivory Coast", stage: "Group E", date: "June 21, 2026 — 2:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["35"] = { team1: "Ecuador", team2: "Curaçao", stage: "Group E", date: "June 21, 2026 — 6:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["36"] = { team1: "Tunisia", team2: "Japan", stage: "Group F", date: "June 21, 2026 — 10:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["37"] = { team1: "Spain", team2: "Saudi Arabia", stage: "Group H", date: "June 21, 2026 — 10:00 PM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["38"] = { team1: "Belgium", team2: "Iran", stage: "Group G", date: "June 22, 2026 — 1:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["39"] = { team1: "Uruguay", team2: "Cape Verde", stage: "Group H", date: "June 22, 2026 — 4:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["40"] = { team1: "New Zealand", team2: "Egypt", stage: "Group G", date: "June 22, 2026 — 7:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["41"] = { team1: "Argentina", team2: "Austria", stage: "Group J", date: "June 22, 2026 — 11:00 PM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["42"] = { team1: "France", team2: "Iraq", stage: "Group I", date: "June 23, 2026 — 3:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["43"] = { team1: "Norway", team2: "Senegal", stage: "Group I", date: "June 23, 2026 — 6:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["44"] = { team1: "Jordan", team2: "Algeria", stage: "Group J", date: "June 23, 2026 — 9:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["45"] = { team1: "Portugal", team2: "Uzbekistan", stage: "Group K", date: "June 23, 2026 — 11:00 PM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["46"] = { team1: "England", team2: "Ghana", stage: "Group L", date: "June 24, 2026 — 2:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["47"] = { team1: "Panama", team2: "Croatia", stage: "Group L", date: "June 24, 2026 — 5:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["48"] = { team1: "Colombia", team2: "Congo DR", stage: "Group K", date: "June 24, 2026 — 8:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };

// ========== GROUP STAGE - MATCHDAY 3 ==========
matches["49"] = { team1: "Switzerland", team2: "Canada", stage: "Group B", date: "June 25, 2026 — 1:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["50"] = { team1: "Bosnia & Herzegovina", team2: "Qatar", stage: "Group B", date: "June 25, 2026 — 1:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["51"] = { team1: "Morocco", team2: "Haiti", stage: "Group C", date: "June 25, 2026 — 4:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["52"] = { team1: "Scotland", team2: "Brazil", stage: "Group C", date: "June 25, 2026 — 4:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["53"] = { team1: "South Africa", team2: "South Korea", stage: "Group A", date: "June 25, 2026 — 7:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["54"] = { team1: "Czechia", team2: "Mexico", stage: "Group A", date: "June 25, 2026 — 7:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["55"] = { team1: "Curaçao", team2: "Ivory Coast", stage: "Group E", date: "June 26, 2026 — 2:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["56"] = { team1: "Ecuador", team2: "Germany", stage: "Group E", date: "June 26, 2026 — 2:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["57"] = { team1: "Tunisia", team2: "Netherlands", stage: "Group F", date: "June 26, 2026 — 5:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["58"] = { team1: "Japan", team2: "Sweden", stage: "Group F", date: "June 26, 2026 — 5:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["59"] = { team1: "Türkiye", team2: "USA", stage: "Group D", date: "June 26, 2026 — 8:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["60"] = { team1: "Paraguay", team2: "Australia", stage: "Group D", date: "June 26, 2026 — 8:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["61"] = { team1: "Norway", team2: "France", stage: "Group I", date: "June 27, 2026 — 1:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["62"] = { team1: "Senegal", team2: "Iraq", stage: "Group I", date: "June 27, 2026 — 1:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["63"] = { team1: "Cape Verde", team2: "Saudi Arabia", stage: "Group H", date: "June 27, 2026 — 6:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["64"] = { team1: "Uruguay", team2: "Spain", stage: "Group H", date: "June 27, 2026 — 6:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["65"] = { team1: "New Zealand", team2: "Belgium", stage: "Group G", date: "June 27, 2026 — 9:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["66"] = { team1: "Egypt", team2: "Iran", stage: "Group G", date: "June 27, 2026 — 9:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["67"] = { team1: "Panama", team2: "England", stage: "Group L", date: "June 28, 2026 — 3:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["68"] = { team1: "Croatia", team2: "Ghana", stage: "Group L", date: "June 28, 2026 — 3:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["69"] = { team1: "Colombia", team2: "Portugal", stage: "Group K", date: "June 28, 2026 — 5:30 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["70"] = { team1: "Congo DR", team2: "Uzbekistan", stage: "Group K", date: "June 28, 2026 — 5:30 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["71"] = { team1: "Algeria", team2: "Austria", stage: "Group J", date: "June 28, 2026 — 8:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["72"] = { team1: "Jordan", team2: "Argentina", stage: "Group J", date: "June 28, 2026 — 8:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };

// ========== ROUND OF 32 ==========
for(let i = 73; i <= 88; i++) {
  matches[i] = { team1: "TBD", team2: "TBD", stage: "Round of 32", date: "TBD", status: "upcoming", result: null, homeScore: null, awayScore: null };
}

// ========== ROUND OF 16 ==========
for(let i = 89; i <= 96; i++) {
  matches[i] = { team1: "TBD", team2: "TBD", stage: "Round of 16", date: "TBD", status: "upcoming", result: null, homeScore: null, awayScore: null };
}

// ========== QUARTER FINALS ==========
for(let i = 97; i <= 100; i++) {
  matches[i] = { team1: "TBD", team2: "TBD", stage: "Quarter Final", date: "TBD", status: "upcoming", result: null, homeScore: null, awayScore: null };
}

// ========== SEMI FINALS ==========
matches["101"] = { team1: "TBD", team2: "TBD", stage: "Semi Final", date: "July 15, 2026 — 5:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };
matches["102"] = { team1: "TBD", team2: "TBD", stage: "Semi Final", date: "July 16, 2026 — 5:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };

// ========== BRONZE FINAL ==========
matches["103"] = { team1: "Loser SF1", team2: "Loser SF2", stage: "Bronze Final", date: "July 19, 2026 — 4:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };

// ========== WORLD CUP FINAL ==========
matches["104"] = { team1: "Winner SF1", team2: "Winner SF2", stage: "FINAL", date: "July 20, 2026 — 5:00 AM", status: "upcoming", result: null, homeScore: null, awayScore: null };

// Save to file
fs.writeFileSync('matches.json', JSON.stringify(matches, null, 2));
console.log(`✅ Created ${Object.keys(matches).length} matches for 2026 World Cup`);
console.log(`   - Group Stage: 72 matches`);
console.log(`   - Round of 32: 16 matches`);
console.log(`   - Round of 16: 8 matches`);
console.log(`   - Quarter Finals: 4 matches`);
console.log(`   - Semi Finals: 2 matches`);
console.log(`   - Bronze Final: 1 match`);
console.log(`   - World Cup Final: 1 match`);
console.log(`\n📝 Total: ${Object.keys(matches).length} matches`);
