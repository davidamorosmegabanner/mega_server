import {CampaignService} from "../campaign/campaign.service";
import {Category} from "./category.model";

export interface SubCategory {
    name: string;
    category: Category;
    key: string;
}

const campaignService = new CampaignService();

const SubCategories: SubCategory[] = [];

SubCategories.push({
    name: "Biographies and memoirs",
    category: campaignService.getCategoryByKey("BL"), // Books and Literature
    key: "BL_BM",
});
SubCategories.push({
    name: "Business and finance",
    category: campaignService.getCategoryByKey("BL"), // Books and Literature
    key: "BL_BF",
});
SubCategories.push({
    name: "Comics",
    category: campaignService.getCategoryByKey("BL"), // Books and Literature
    key: "BL_CO",
});
SubCategories.push({
    name: "Cookbooks, food, and wine",
    category: campaignService.getCategoryByKey("BL"), // Books and Literature
    key: "BL_CF",
});
SubCategories.push({
    name: "Biographies and memoirs",
    category: campaignService.getCategoryByKey("BL"), // Books and Literature
    key: "BL_BM",
});
SubCategories.push({
    name: "Health, mind, and body",
    category: campaignService.getCategoryByKey("BL"), // Books and Literature
    key: "BL_HM",
});
SubCategories.push({
    name: "Mystery and crime",
    category: campaignService.getCategoryByKey("BL"), // Books and Literature
    key: "BL_MC",
});
SubCategories.push({
    name: "Nonfiction",
    category: campaignService.getCategoryByKey("BL"), // Books and Literature
    key: "BL_NF",
});
SubCategories.push({
    name: "Politics and current events",
    category: campaignService.getCategoryByKey("BL"), // Books and Literature
    key: "BL_PC",
});
SubCategories.push({
    name: "Romance",
    category: campaignService.getCategoryByKey("BL"), // Books and Literature
    key: "BL_RO",
});
SubCategories.push({
    name: "Books news and general info",
    category: campaignService.getCategoryByKey("BL"), // Books and Literature
    key: "BL_BG",
});
SubCategories.push({
    name: "Action and adventure",
    category: campaignService.getCategoryByKey("MT"), // Music and Television
    key: "MT_AA",
});
SubCategories.push({
    name: "Animation",
    category: campaignService.getCategoryByKey("MT"), // Music and Television
    key: "MT_AN",
});
SubCategories.push({
    name: "Bollywood",
    category: campaignService.getCategoryByKey("MT"), // Music and Television
    key: "MT_BO",
});
SubCategories.push({
    name: "Business and news",
    category: campaignService.getCategoryByKey("MT"), // Music and Television
    key: "MT_BN",
});
SubCategories.push({
    name: "Comedy",
    category: campaignService.getCategoryByKey("MT"), // Music and Television
    key: "MT_CO",
});
SubCategories.push({
    name: "Documentary",
    category: campaignService.getCategoryByKey("MT"), // Music and Television
    key: "MT_DO",
});
SubCategories.push({
    name: "Drama",
    category: campaignService.getCategoryByKey("MT"), // Music and Television
    key: "MT_DR",
});
SubCategories.push({
    name: "Foreign",
    category: campaignService.getCategoryByKey("MT"), // Music and Television
    key: "MT_FO",
});
SubCategories.push({
    name: "Horror",
    category: campaignService.getCategoryByKey("MT"), // Music and Television
    key: "MT_HO",
});
SubCategories.push({
    name: "Independent",
    category: campaignService.getCategoryByKey("MT"), // Music and Television
    key: "MT_IN",
});
SubCategories.push({
    name: "Music",
    category: campaignService.getCategoryByKey("MT"), // Music and Television
    key: "MT_IN",
});
SubCategories.push({
    name: "Reality TV",
    category: campaignService.getCategoryByKey("MT"), // Music and Television
    key: "MT_RE",
});
SubCategories.push({
    name: "Romance",
    category: campaignService.getCategoryByKey("MT"), // Music and Television
    key: "MT_RO",
});
SubCategories.push({
    name: "Sci-fi and fantasy",
    category: campaignService.getCategoryByKey("MT"), // Music and Television
    key: "MT_SF",
});
SubCategories.push({
    name: "Sports themed",
    category: campaignService.getCategoryByKey("MT"), // Music and Television
    key: "MT_ST",
});
SubCategories.push({
    name: "Movie news and general info",
    category: campaignService.getCategoryByKey("MT"), // Music and Television
    key: "MT_MG",
});
SubCategories.push({
    name: "Blues",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_BL",
});
SubCategories.push({
    name: "Christian and gospel",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_CG",
});
SubCategories.push({
    name: "Classical",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_CL",
});
SubCategories.push({
    name: "Country",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_CO",
});
SubCategories.push({
    name: "DJs",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_DJ",
});
SubCategories.push({
    name: "Dance",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_DA",
});
SubCategories.push({
    name: "Electronic",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_EL",
});
SubCategories.push({
    name: "Hip hop and rap",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_HH",
});
SubCategories.push({
    name: "Indie spotlight",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_IN",
});
SubCategories.push({
    name: "Jazz",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_JA",
});
SubCategories.push({
    name: "Latino",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_LA",
});
SubCategories.push({
    name: "Metal",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_ME",
});
SubCategories.push({
    name: "Pop",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_PO",
});
SubCategories.push({
    name: "R&B and soul",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_RB",
});
SubCategories.push({
    name: "Reggae",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_RE",
});
SubCategories.push({
    name: "Rock",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_RO",
});
SubCategories.push({
    name: "Talk radio",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_TR",
});
SubCategories.push({
    name: "Venues",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_VE",
});
SubCategories.push({
    name: "World",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_WO",
});
SubCategories.push({
    name: "Music news and general info",
    category: campaignService.getCategoryByKey("MR"), // Music and Radio
    key: "MR_MN",
});
SubCategories.push({
    name: "Board gaming",
    category: campaignService.getCategoryByKey("GA"), // Gaming
    key: "GA_BO",
});
SubCategories.push({
    name: "Computer gaming",
    category: campaignService.getCategoryByKey("GA"), // Gaming
    key: "GA_CM",
});
SubCategories.push({
    name: "Console gaming",
    category: campaignService.getCategoryByKey("GA"), // Gaming
    key: "GA_CN",
});
SubCategories.push({
    name: "Mobile gaming",
    category: campaignService.getCategoryByKey("GA"), // Gaming
    key: "GA_MO",
});
SubCategories.push({
    name: "Online gaming",
    category: campaignService.getCategoryByKey("GA"), // Gaming
    key: "GA_ON",
});
SubCategories.push({
    name: "Roleplaying games",
    category: campaignService.getCategoryByKey("GA"), // Gaming
    key: "GA_RO",
});
SubCategories.push({
    name: "Gaming news and general info",
    category: campaignService.getCategoryByKey("GA"), // Gaming
    key: "GA_GN",
});
SubCategories.push({
    name: "Car culture",
    category: campaignService.getCategoryByKey("AU"), // Automotive
    key: "AU_CC",
});
SubCategories.push({
    name: "Convertibles",
    category: campaignService.getCategoryByKey("AU"), // Automotive
    key: "AU_CO",
});
SubCategories.push({
    name: "Hybrid and electric vehicles",
    category: campaignService.getCategoryByKey("AU"), // Automotive
    key: "AU_HY",
});
SubCategories.push({
    name: "Luxury",
    category: campaignService.getCategoryByKey("AU"), // Automotive
    key: "AU_LU",
});
SubCategories.push({
    name: "Minivans",
    category: campaignService.getCategoryByKey("AU"), // Automotive
    key: "AU_MI",
});
SubCategories.push({
    name: "Motorcycles",
    category: campaignService.getCategoryByKey("AU"), // Automotive
    key: "AU_MO",
});
SubCategories.push({
    name: "Offroad vehicles",
    category: campaignService.getCategoryByKey("AU"), // Automotive
    key: "AU_OF",
});
SubCategories.push({
    name: "Performance vehicles",
    category: campaignService.getCategoryByKey("AU"), // Automotive
    key: "AU_PE",
});
SubCategories.push({
    name: "Sedans",
    category: campaignService.getCategoryByKey("AU"), // Automotive
    key: "AU_SE",
});
SubCategories.push({
    name: "SUVs",
    category: campaignService.getCategoryByKey("AU"), // Automotive
    key: "AU_SU",
});
SubCategories.push({
    name: "Trucks",
    category: campaignService.getCategoryByKey("AU"), // Automotive
    key: "AU_TR",
});
SubCategories.push({
    name: "Vintage cars",
    category: campaignService.getCategoryByKey("AU"), // Automotive
    key: "AU_VI",
});
SubCategories.push({
    name: "Automotive news and general info",
    category: campaignService.getCategoryByKey("AU"), // Automotive
    key: "AU_NG",
});
SubCategories.push({
    name: "Advertising",
    category: campaignService.getCategoryByKey("BU"), // Business
    key: "BU_AD",
});
SubCategories.push({
    name: "Biotech and biomedical",
    category: campaignService.getCategoryByKey("BU"), // Business
    key: "BU_BI",
});
SubCategories.push({
    name: "Business software",
    category: campaignService.getCategoryByKey("BU"), // Business
    key: "BU_BS",
});
SubCategories.push({
    name: "Construction",
    category: campaignService.getCategoryByKey("BU"), // Business
    key: "BU_CO",
});
SubCategories.push({
    name: "Government",
    category: campaignService.getCategoryByKey("BU"), // Business
    key: "BU_GO",
});
SubCategories.push({
    name: "Green solutions",
    category: campaignService.getCategoryByKey("BU"), // Business
    key: "BU_GR",
});
SubCategories.push({
    name: "Human resources",
    category: campaignService.getCategoryByKey("BU"), // Business
    key: "BU_HU",
});
SubCategories.push({
    name: "Marketing",
    category: campaignService.getCategoryByKey("BU"), // Business
    key: "BU_MA",
});
SubCategories.push({
    name: "Entrepreneurship",
    category: campaignService.getCategoryByKey("BU"), // Business
    key: "BU_EN",
});
SubCategories.push({
    name: "Investors and patents",
    category: campaignService.getCategoryByKey("BU"), // Business
    key: "BU_IN",
});
SubCategories.push({
    name: "Small business",
    category: campaignService.getCategoryByKey("BU"), // Business
    key: "BU_SM",
});
SubCategories.push({
    name: "Nonprofit",
    category: campaignService.getCategoryByKey("BU"), // Business
    key: "BU_NO",
});
SubCategories.push({
    name: "Leadership",
    category: campaignService.getCategoryByKey("BU"), // Business
    key: "BU_LE",
});
SubCategories.push({
    name: "Technology",
    category: campaignService.getCategoryByKey("BU"), // Business
    key: "BU_TE",
});
SubCategories.push({
    name: "Organized labor and unions",
    category: campaignService.getCategoryByKey("BU"), // Business
    key: "BU_OR",
});
SubCategories.push({
    name: "Business news and general info",
    category: campaignService.getCategoryByKey("BU"), // Business
    key: "BU_NG",
});
SubCategories.push({
    name: "Financial aid and scholarships",
    category: campaignService.getCategoryByKey("CA"), // Careers
    key: "CA_FI",
});
SubCategories.push({
    name: "Job fairs",
    category: campaignService.getCategoryByKey("CA"), // Careers
    key: "CA_JF",
});
SubCategories.push({
    name: "Job search",
    category: campaignService.getCategoryByKey("CA"), // Careers
    key: "CA_JS",
});
SubCategories.push({
    name: "U.S. military",
    category: campaignService.getCategoryByKey("CA"), // Careers
    key: "CA_MI",
});
SubCategories.push({
    name: "Career news and general info",
    category: campaignService.getCategoryByKey("CA"), // Careers
    key: "CA_NG",
});
SubCategories.push({
    name: "Auto intenders",
    category: campaignService.getCategoryByKey("LS"), // Life stages
    key: "LS_AI",
});
SubCategories.push({
    name: "Empty nesters",
    category: campaignService.getCategoryByKey("LS"), // Life stages
    key: "LS_EN",
});
SubCategories.push({
    name: "Moms",
    category: campaignService.getCategoryByKey("LS"), // Life stages
    key: "LS_MO",
});
SubCategories.push({
    name: "Dads",
    category: campaignService.getCategoryByKey("LS"), // Life stages
    key: "LS_DA",
});
SubCategories.push({
    name: "College students",
    category: campaignService.getCategoryByKey("LS"), // Life stages
    key: "LS_CO",
});
SubCategories.push({
    name: "Newlyweds",
    category: campaignService.getCategoryByKey("LS"), // Life stages
    key: "LS_NE",
});
SubCategories.push({
    name: "Veterans",
    category: campaignService.getCategoryByKey("LS"), // Life stages
    key: "LS_VE",
});
SubCategories.push({
    name: "Adult education",
    category: campaignService.getCategoryByKey("ED"), // Education
    key: "ED_AD",
});
SubCategories.push({
    name: "College life",
    category: campaignService.getCategoryByKey("ED"), // Education
    key: "ED_CO",
});
SubCategories.push({
    name: "Language learning",
    category: campaignService.getCategoryByKey("ED"), // Education
    key: "ED_LA",
});
SubCategories.push({
    name: "Graduate school",
    category: campaignService.getCategoryByKey("ED"), // Education
    key: "ED_GR",
});
SubCategories.push({
    name: "Homeschooling",
    category: campaignService.getCategoryByKey("ED"), // Education
    key: "ED_HO",
});
SubCategories.push({
    name: "Special education",
    category: campaignService.getCategoryByKey("ED"), // Education
    key: "ED_SP",
});
SubCategories.push({
    name: "Online education",
    category: campaignService.getCategoryByKey("ED"), // Education
    key: "ED_ON",
});
SubCategories.push({
    name: "Education news and general info",
    category: campaignService.getCategoryByKey("ED"), // Education
    key: "ED_NG",
});
SubCategories.push({
    name: "Babies and toddlers",
    category: campaignService.getCategoryByKey("FP"), // Family and parenting
    key: "FP_BA",
});
SubCategories.push({
    name: "Daycare and preschool",
    category: campaignService.getCategoryByKey("FP"), // Family and parenting
    key: "FP_DA",
});
SubCategories.push({
    name: "Parenting K-6 kids",
    category: campaignService.getCategoryByKey("FP"), // Family and parenting
    key: "FP_PK",
});
SubCategories.push({
    name: "Parenting teens",
    category: campaignService.getCategoryByKey("FP"), // Family and parenting
    key: "FP_PT",
});
SubCategories.push({
    name: "Pregnancy",
    category: campaignService.getCategoryByKey("FP"), // Family and parenting
    key: "FP_PR",
});
SubCategories.push({
    name: "Special needs kids",
    category: campaignService.getCategoryByKey("FP"), // Family and parenting
    key: "FP_SP",
});
SubCategories.push({
    name: "Elder care",
    category: campaignService.getCategoryByKey("FP"), // Family and parenting
    key: "FP_EL",
});
SubCategories.push({
    name: "Music festivals and concerts",
    category: campaignService.getCategoryByKey("EV"), // Events
    key: "EV_MU",
});
SubCategories.push({
    name: "Movie festivals",
    category: campaignService.getCategoryByKey("EV"), // Events
    key: "EV_MO",
});
SubCategories.push({
    name: "Sporting events",
    category: campaignService.getCategoryByKey("EV"), // Events
    key: "EV_SP",
});
SubCategories.push({
    name: "Holidays",
    category: campaignService.getCategoryByKey("EV"), // Events
    key: "EV_HO",
});
SubCategories.push({
    name: "Political elections",
    category: campaignService.getCategoryByKey("EV"), // Events
    key: "EV_PO",
});
SubCategories.push({
    name: "Entertainment awards",
    category: campaignService.getCategoryByKey("EV"), // Events
    key: "EV_EN",
});
SubCategories.push({
    name: "Tech tradeshows",
    category: campaignService.getCategoryByKey("EV"), // Events
    key: "EV_TE",
});
SubCategories.push({
    name: "American cuisine",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_AM",
});
SubCategories.push({
    name: "Bars and nightlife",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_BN",
});
SubCategories.push({
    name: "Barbecues and grilling",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_BG",
});
SubCategories.push({
    name: "Beer",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_BE",
});
SubCategories.push({
    name: "Cajun and Creole",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_CC",
});
SubCategories.push({
    name: "Chinese cuisine",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_CH",
});
SubCategories.push({
    name: "Cocktails and beer",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_CB",
});
SubCategories.push({
    name: "Coffee and tea",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_CO",
});
SubCategories.push({
    name: "Desserts and baking",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_DB",
});
SubCategories.push({
    name: "Dining out",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_DO",
});
SubCategories.push({
    name: "Ethnic foods",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_ET",
});
SubCategories.push({
    name: "Fast food",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_FF",
});
SubCategories.push({
    name: "Fine dining",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_FD",
});
SubCategories.push({
    name: "French cuisine",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_FR",
});
SubCategories.push({
    name: "Cooking",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_CO",
});
SubCategories.push({
    name: "Italian cuisine",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_IT",
});
SubCategories.push({
    name: "Japanese cuisine",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_JP",
});
SubCategories.push({
    name: "Liquor and spirits",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_LI",
});
SubCategories.push({
    name: "Mexican cuisine",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_MX",
});
SubCategories.push({
    name: "Vegan",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_VG",
});
SubCategories.push({
    name: "Vegetarian",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_VT",
});
SubCategories.push({
    name: "Wine",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_WI",
});
SubCategories.push({
    name: "Foodie news and general info",
    category: campaignService.getCategoryByKey("FD"), // Food and Drinks
    key: "FD_NG",
});
SubCategories.push({
    name: "Arts and crafts",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_AR",
});
SubCategories.push({
    name: "Birdwatching",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_BI",
});
SubCategories.push({
    name: "Boating",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_BO",
});
SubCategories.push({
    name: "Performance arts",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_PE",
});
SubCategories.push({
    name: "Chess",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_CH",
});
SubCategories.push({
    name: "Cigars",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_CI",
});
SubCategories.push({
    name: "Drawing and sketching",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_DR",
});
SubCategories.push({
    name: "Freelance writing",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_FR",
});
SubCategories.push({
    name: "Genealogy",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_GE",
});
SubCategories.push({
    name: "Guitar",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_GU",
});
SubCategories.push({
    name: "Gambling",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_GA",
});
SubCategories.push({
    name: "Jewelry making",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_JE",
});
SubCategories.push({
    name: "Needlework",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_NE",
});
SubCategories.push({
    name: "Painting",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_PA",
});
SubCategories.push({
    name: "Photography",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_PH",
});
SubCategories.push({
    name: "Sci-fi and fantasy",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_SF",
});
SubCategories.push({
    name: "Scrapbooking",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_SB",
});
SubCategories.push({
    name: "Screenwriting",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_SW",
});
SubCategories.push({
    name: "Shopping",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_SH",
});
SubCategories.push({
    name: "Stamps and coins",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_SC",
});
SubCategories.push({
    name: "Celebrity fan and gossip",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_CG",
});
SubCategories.push({
    name: "Comedy",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_CO",
});
SubCategories.push({
    name: "Dance",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_DA",
});
SubCategories.push({
    name: "Modeling",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_MO",
});
SubCategories.push({
    name: "Cartoons",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_CA",
});
SubCategories.push({
    name: "Design",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_DE",
});
SubCategories.push({
    name: "Astrology",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_AS",
});
SubCategories.push({
    name: "Paranormal phenomena",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_PP",
});
SubCategories.push({
    name: "Exercise and fitness",
    category: campaignService.getCategoryByKey("HI"), // Hobbies and interests
    key: " HI_EF",
});
SubCategories.push({
    name: "Appliances",
    category: campaignService.getCategoryByKey("HG"), // Home and Garden
    key: "HG_AP",
});
SubCategories.push({
    name: "Entertaining at home",
    category: campaignService.getCategoryByKey("HG"), // Home and Garden
    key: "HG_EN",
});
SubCategories.push({
    name: "Gardening",
    category: campaignService.getCategoryByKey("HG"), // Home and Garden
    key: "HG_GA",
});
SubCategories.push({
    name: "Home repair",
    category: campaignService.getCategoryByKey("HG"), // Home and Garden
    key: "HG_HR",
});
SubCategories.push({
    name: "Interior decorating",
    category: campaignService.getCategoryByKey("HG"), // Home and Garden
    key: "HG_ID",
});
SubCategories.push({
    name: "Landscaping",
    category: campaignService.getCategoryByKey("HG"), // Home and Garden
    key: "HG_LA",
});
SubCategories.push({
    name: "Remodeling and construction",
    category: campaignService.getCategoryByKey("HG"), // Home and Garden
    key: "HG_RE",
});
SubCategories.push({
    name: "General info",
    category: campaignService.getCategoryByKey("HG"), // Home and Garden
    key: "HG_GI",
});
SubCategories.push({
    name: "Legal issues",
    category: campaignService.getCategoryByKey("LG"), // Law and government
    key: "LG_LI",
});
SubCategories.push({
    name: "Government resources",
    category: campaignService.getCategoryByKey("LG"), // Law and government
    key: "LG_GR",
});
SubCategories.push({
    name: "Politics",
    category: campaignService.getCategoryByKey("LG"), // Law and government
    key: "LG_PO",
});
SubCategories.push({
    name: "Commentary",
    category: campaignService.getCategoryByKey("LG"), // Law and government
    key: "LG_CO",
});
SubCategories.push({
    name: "Conservative",
    category: campaignService.getCategoryByKey("LG"), // Law and government
    key: "LG_CN",
});
SubCategories.push({
    name: "Liberal",
    category: campaignService.getCategoryByKey("LG"), // Law and government
    key: "LG_LO",
});
SubCategories.push({
    name: "Nonpartisan",
    category: campaignService.getCategoryByKey("LG"), // Law and government
    key: "LG_NP",
});
SubCategories.push({
    name: "Banking",
    category: campaignService.getCategoryByKey("PF"), // Personal finance
    key: "PF_BA",
});
SubCategories.push({
    name: "Beginning investing",
    category: campaignService.getCategoryByKey("PF"), // Personal finance
    key: "PF_BI",
});
SubCategories.push({
    name: "Credit, debt, and loans",
    category: campaignService.getCategoryByKey("PF"), // Personal finance
    key: "PF_CD",
});
SubCategories.push({
    name: "Financial news",
    category: campaignService.getCategoryByKey("PF"), // Personal finance
    key: "PF_FN",
});
SubCategories.push({
    name: "Financial planning",
    category: campaignService.getCategoryByKey("PF"), // Personal finance
    key: "PF_FP",
});
SubCategories.push({
    name: "Hedge funds",
    category: campaignService.getCategoryByKey("PF"), // Personal finance
    key: "PF_HF",
});
SubCategories.push({
    name: "Insurance",
    category: campaignService.getCategoryByKey("PF"), // Personal finance
    key: "PF_IN",
});
SubCategories.push({
    name: "Investing",
    category: campaignService.getCategoryByKey("PF"), // Personal finance
    key: "PF_IV",
});
SubCategories.push({
    name: "Mortgage",
    category: campaignService.getCategoryByKey("PF"), // Personal finance
    key: "PF_MO",
});
SubCategories.push({
    name: "Mutual funds",
    category: campaignService.getCategoryByKey("PF"), // Personal finance
    key: "PF_MF",
});
SubCategories.push({
    name: "Options",
    category: campaignService.getCategoryByKey("PF"), // Personal finance
    key: "PF_OP",
});
SubCategories.push({
    name: "Real estate",
    category: campaignService.getCategoryByKey("PF"), // Personal finance
    key: "PF_RE",
});
SubCategories.push({
    name: "Retirement planning",
    category: campaignService.getCategoryByKey("PF"), // Personal finance
    key: "PF_RP",
});
SubCategories.push({
    name: "Stocks",
    category: campaignService.getCategoryByKey("PF"), // Personal finance
    key: "PF_ST",
});
SubCategories.push({
    name: "Tax planning",
    category: campaignService.getCategoryByKey("PF"), // Personal finance
    key: "PF_TP",
});
SubCategories.push({
    name: "Dating",
    category: campaignService.getCategoryByKey("SO"), // Society
    key: "SO_DA",
});
SubCategories.push({
    name: "Divorce support",
    category: campaignService.getCategoryByKey("SO"), // Society
    key: "SO_DI",
});
SubCategories.push({
    name: "Marriage",
    category: campaignService.getCategoryByKey("SO"), // Society
    key: "SO_MA",
});
SubCategories.push({
    name: "Senior living",
    category: campaignService.getCategoryByKey("SO"), // Society
    key: "SO_SE",
});
SubCategories.push({
    name: "Weddings",
    category: campaignService.getCategoryByKey("SO"), // Society
    key: "SO_WE",
});
SubCategories.push({
    name: "Biology",
    category: campaignService.getCategoryByKey("SC"), // Science
    key: "SC_BI",
});
SubCategories.push({
    name: "Chemistry",
    category: campaignService.getCategoryByKey("SC"), // Science
    key: "SC_CH",
});
SubCategories.push({
    name: "Geology",
    category: campaignService.getCategoryByKey("SC"), // Science
    key: "SC_GE",
});
SubCategories.push({
    name: "Physics",
    category: campaignService.getCategoryByKey("SC"), // Science
    key: "SC_PH",
});
SubCategories.push({
    name: "Space and astronomy",
    category: campaignService.getCategoryByKey("SC"), // Science
    key: "SC_SP",
});
SubCategories.push({
    name: "Geography",
    category: campaignService.getCategoryByKey("SC"), // Science
    key: "SC_GG",
});
SubCategories.push({
    name: "Weather",
    category: campaignService.getCategoryByKey("SC"), // Science
    key: "SC_WE",
});
SubCategories.push({
    name: "Science news",
    category: campaignService.getCategoryByKey("SC"), // Science
    key: "SC_SN",
});
SubCategories.push({
    name: "Birds",
    category: campaignService.getCategoryByKey("PE"), // Pets
    key: "PE_BI",
});
SubCategories.push({
    name: "Cats",
    category: campaignService.getCategoryByKey("PE"), // Pets
    key: "PE_CA",
});
SubCategories.push({
    name: "Dogs",
    category: campaignService.getCategoryByKey("PE"), // Pets
    key: "PE_DO",
});
SubCategories.push({
    name: "Horses",
    category: campaignService.getCategoryByKey("PE"), // Pets
    key: "PE_HO",
});
SubCategories.push({
    name: "Reptiles",
    category: campaignService.getCategoryByKey("PE"), // Pets
    key: "PE_RE",
});
SubCategories.push({
    name: "General info",
    category: campaignService.getCategoryByKey("PE"), // Pets
    key: "PE_GI",
});
SubCategories.push({
    name: "Action sports",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_AC",
});
SubCategories.push({
    name: "Auto racing",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_AU",
});
SubCategories.push({
    name: "Baseball",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_BA",
});
SubCategories.push({
    name: "NBA basketball",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_NB",
});
SubCategories.push({
    name: "College basketball",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_CB",
});
SubCategories.push({
    name: "Cycling",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_CY",
});
SubCategories.push({
    name: "Bodybuilding",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_BB",
});
SubCategories.push({
    name: "Boxing",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_BO",
});
SubCategories.push({
    name: "Canoeing and kayaking",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_CK",
});
SubCategories.push({
    name: "Climbing",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_CL",
});
SubCategories.push({
    name: "Cricket",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_CR",
});
SubCategories.push({
    name: "Fantasy sports",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_FP",
});
SubCategories.push({
    name: "Figure skating",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_FS",
});
SubCategories.push({
    name: "Fishing",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_FI",
});
SubCategories.push({
    name: "NFL football",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_NF",
});
SubCategories.push({
    name: "College football",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_CF",
});
SubCategories.push({
    name: "Golf",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_GO",
});
SubCategories.push({
    name: "Horse racing",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_HR",
});
SubCategories.push({
    name: "Hunting and shooting",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_HS",
});
SubCategories.push({
    name: "Martial arts",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_MA",
});
SubCategories.push({
    name: "Mountain biking",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_MB",
});
SubCategories.push({
    name: "NASCAR racing",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_NR",
});
SubCategories.push({
    name: "Olympics",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_OL",
});
SubCategories.push({
    name: "Paintball",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_PB",
});
SubCategories.push({
    name: "Poker",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_PK",
});
SubCategories.push({
    name: "Power and motorcycles",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_PM",
});
SubCategories.push({
    name: "Ice hockey",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_IH",
});
SubCategories.push({
    name: "Rodeo",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_RO",
});
SubCategories.push({
    name: "Rugby",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_RU",
});
SubCategories.push({
    name: "Running and jogging",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_RJ",
});
SubCategories.push({
    name: "Sailing",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_SA",
});
SubCategories.push({
    name: "Scuba diving",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_SD",
});
SubCategories.push({
    name: "Skateboarding",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_SB",
});
SubCategories.push({
    name: "Skiing",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_SK",
});
SubCategories.push({
    name: "Snowboarding",
    category: campaignService.getCategoryByKey("SP"), // Sports
    key: "SP_SB",
});

export default SubCategories;
