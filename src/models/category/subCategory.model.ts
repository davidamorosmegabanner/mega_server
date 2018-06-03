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

// TODO finish subCategories

export default SubCategories;
