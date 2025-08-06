import { useState, useEffect } from 'react';
import Items from '../classes/item';
import type { ProcessedBazaarProduct, ProcessedBazaarData} from '../classes/item';
import { getAuctionsData } from '../api/auction.ts';
import { getBazaarData } from '../api/bazaar.ts';

interface almostThere {
    name: Items,
    cost: number | undefined,
    materialCost: number | undefined,
    hotm: number,
}

interface Hotm {
    name: Items,
    hotm: number
}

//timeToCraft will be treated as minutes
const mithril = new Items({name:"Mithril", bazaar:true, timeToCraft:0, id:"MITHRIL_ORE"});
const enchantedMithril = new Items({name:"Enchanted Mithril", bazaar:true, timeToCraft:0, id:"ENCHANTED_MITHRIL", resourcesRequired:[{name: mithril, amount:160}]});
const refinedMithril = new Items({name: "Refined Mithril", bazaar: true, timeToCraft: 360, id:"REFINED_MITHRIL", resourcesRequired:[{name: enchantedMithril, amount:160}]});

const diamond = new Items({name:"Diamond", bazaar:true, timeToCraft:0, id:"DIAMOND"});
const enchantedDiamond = new Items({name:"Enchanted Diamond", bazaar:true, timeToCraft:0, id:"ENCHANTED_DIAMOND", resourcesRequired:[{name: diamond, amount:160}]});
const enchantedDiamondBlock = new Items({name:"Enchanted Diamond Block", bazaar:true, timeToCraft:0, id:"ENCHANTED_DIAMOND_BLOCK", resourcesRequired:[{name: enchantedDiamond, amount:160}]});
const refinedDiamond = new Items({name:"Refined Diamond", bazaar:true, timeToCraft:480, id:"REFINED_DIAMOND", resourcesRequired:[{name: enchantedDiamondBlock, amount:2}]});

const titanium = new Items({name:"Titanium", bazaar:true, timeToCraft:0, id:"TITANIUM_ORE"});
const enchantedTitanium = new Items({name:"Enchanted Titanium", bazaar:true, timeToCraft:0, id:"ENCHANTED_TITANIUM", resourcesRequired:[{name:titanium, amount:160}]});
const refinedTitanium = new Items({name:"Refined Titanium", bazaar:true, timeToCraft:720, id:"REFINED_TITANIUM", resourcesRequired:[{name:enchantedTitanium, amount:16}]});

const umber = new Items({name:"Umber", bazaar:true, timeToCraft:0, id:"UMBER"});
const enchantedUmber = new Items({name:"Enchanted Umber", bazaar:true, timeToCraft:0, id:"ENCHANTED_UMBER", resourcesRequired:[{name:umber, amount:160}]});
const refinedUmber = new Items({name:"Refined Umber", bazaar:true, timeToCraft:60, id:"REFINED_UMBER", resourcesRequired:[{name:enchantedUmber, amount:160}]});

const tungsten = new Items({name:"Tungsten", bazaar:true, timeToCraft:0, id:"TUNGSTEN"});
const enchantedTungsten = new Items({name:"Enchanted Tungsten", bazaar:true, timeToCraft:0, id:"ENCHANTED_TUNGSTEN", resourcesRequired:[{name:tungsten, amount:160}]});
const refinedTungsten = new Items({name:"Refined Tungsten", bazaar:true, timeToCraft:60, id:"REFINED_TUNGSTEN", resourcesRequired:[{name:enchantedTungsten, amount:160}]});

const glaciteJewel = new Items({name:"Glacite Jewel", bazaar:true, timeToCraft:0, id:"GLACITE_JEWEL"});
const bejeweledHandle = new Items({name:"Bejeweled Handle", bazaar:true, timeToCraft:0.5, id:"BEJEWELED_HANDLE", resourcesRequired:[{name:glaciteJewel, amount:3}]});

const treasurite = new Items({name:"Treasurite", bazaar:true, timeToCraft:0, id:"TEASURITE"});

const iron = new Items({name:"Iron", bazaar:true, timeToCraft:0, id:"IRON_INGOT"});
const enchantedIron = new Items({name:"Enchanted Iron", bazaar:true, timeToCraft:0, id:"ENCHANTED_IRON", resourcesRequired:[{name:iron, amount:160}]});
const enchantedIronBlock = new Items({name: "Enchanted Iron Block", bazaar:true, timeToCraft:0, id:"ENCHANTED_IRON_BLOCK", resourcesRequired:[{name:enchantedIron, amount:160}]});

const redstone = new Items({name:"Redstone", bazaar:true, timeToCraft:0, id:"REDSTONE"});
const enchantedRedstone = new Items({name:"Enchanted Redstone", bazaar:true, timeToCraft:0, id:"ENCHANTED_REDSTONE", resourcesRequired:[{name:redstone, amount:160}]});
const enchantedRedstoneBlock = new Items({name:"Enchanted Redstone Block", bazaar:true, timeToCraft:0, id:"ENCHANTED_REDSTONE_BLOCK", resourcesRequired:[{name:enchantedRedstone, amount:160}]});

const gold = new Items({name:"Gold", bazaar:true, timeToCraft:0, id:"GOLD_INGOT"});
const enchantedGold = new Items({name:"Enchanted Gold", bazaar:true, timeToCraft:0, id:"ENCHANTED_GOLD", resourcesRequired:[{name:gold, amount:160}]});
const enchantedGoldBlock = new Items({name:"Enchanted Gold Block", bazaar:true, timeToCraft:0, id:"ENCHANTED_GOLD_BLOCK", resourcesRequired:[{name:enchantedGold, amount:160}]});

const goldenPlate = new Items({name:"Golden Plate", bazaar:true, timeToCraft:360, id:"GOLDEN_PLATE", resourcesRequired:[{name:enchantedGoldBlock, amount:2}, {name:glaciteJewel, amount:5}, {name:refinedDiamond, amount:1}]});

const drillMotor = new Items({name:"Drill Motor", bazaar:true, timeToCraft: 1800, id:"DRILL_ENGINE", resourcesRequired:[{name: treasurite, amount:10}, {name: enchantedIronBlock, amount: 1}, {name: enchantedRedstoneBlock, amount:3}, {name: goldenPlate, amount:1}]});

const coal = new Items({name:"Coal", bazaar:true, timeToCraft:0, id:"COAL"});
const enchantedCoal = new Items({name:"Enchanted Coal", bazaar:true, timeToCraft:0, id:"ENCHANTED_COAL", resourcesRequired:[{name: coal, amount:160}]});
const enchantedCoalBlock = new Items({name:"Enchanted Coal Block", bazaar:true, timeToCraft:0, id:"ENCHANTED_COAL_BLOCK", resourcesRequired:[{name:enchantedCoal, amount:160}]});

const fuelCanister = new Items({name:"Fuel Canister", bazaar:true, timeToCraft:600, id:"FUEL_TANK", resourcesRequired:[{name:enchantedCoalBlock, amount:2}]});

const sludgeJuice = new Items({name:"Sludge Juice", bazaar:true, timeToCraft:0, id:"SLUDGE_JUICE"});

const roughOpal = new Items({name:"Rough Opal Gemstone", bazaar:true, timeToCraft:0, id:"ROUGH_OPAL_GEM"});
const flawedOpal = new Items({name:"Flawed Opal Gemstone", bazaar:true, timeToCraft:0, id:"FLAWED_OPAL_GEM", resourcesRequired:[{name:roughOpal, amount:80}]});
const fineOpal = new Items({name:"Fine Opal Gemstone", bazaar:true, timeToCraft:0, id:"FINE_OPAL_GEM", resourcesRequired:[{name:flawedOpal, amount:80}]});
const flawlessOpal = new Items({name:"Flawless Opal Gemstone", bazaar:true, timeToCraft:0, id:"FLAWLESS_OPAL_GEM", resourcesRequired:[{name:fineOpal, amount:80}]});
const perfectOpal = new Items({name:"Perfect Opal Gemstone",bazaar:true,timeToCraft:1200,id:"PERFECT_OPAL_GEM",resourcesRequired:[{name:flawlessOpal,amount:5}]});

const roughJasper = new Items({name:"Rough Jasper Gemstone", bazaar:true, timeToCraft:0, id:"ROUGH_JASPER_GEM"});
const flawedJasper = new Items({name:"Flawed Jasper Gemstone", bazaar:true, timeToCraft:0, id:"FLAWED_JASPER_GEM", resourcesRequired:[{name:roughJasper, amount:80}]});
const fineJasper = new Items({name:"Fine Jasper Gemstone", bazaar:true, timeToCraft:0, id:"FINE_JASPER_GEM", resourcesRequired:[{name:flawedJasper, amount:80}]});
const flawlessJasper = new Items({name:"Flawless Jasper Gemstone", bazaar:true, timeToCraft:0, id:"FLAWLESS_JASPER_GEM", resourcesRequired:[{name:fineJasper, amount:80}]});

const roughTopaz = new Items({name:"Rough Topaz Gemstone", bazaar:true, timeToCraft:0, id:"ROUGH_TOPAZ_GEM"});
const flawedTopaz = new Items({name:"Flawed Topaz Gemstone", bazaar:true, timeToCraft:0, id:"FLAWED_TOPAZ_GEM", resourcesRequired:[{name:roughTopaz, amount:80}]});
const fineTopaz = new Items({name:"Fine Topaz Gemstone", bazaar:true, timeToCraft:0, id:"FINE_TOPAZ_GEM", resourcesRequired:[{name:flawedTopaz, amount:80}]});
const flawlessTopaz = new Items({name:"Flawless Topaz Gemstone", bazaar:true, timeToCraft:0, id:"FLAWLESS_TOPAZ_GEM", resourcesRequired:[{name:fineTopaz, amount:80}]});

const roughRuby = new Items({name:"Rough Ruby Gemstone", bazaar:true, timeToCraft:0, id:"ROUGH_RUBY_GEM"});
const flawedRuby = new Items({name:"Flawed Ruby Gemstone", bazaar:true, timeToCraft:0, id:"FLAWED_RUBY_GEM", resourcesRequired:[{name:roughRuby, amount:80}]});
const fineRuby = new Items({name:"Fine Ruby Gemstone", bazaar:true, timeToCraft:0, id:"FINE_RUBY_GEM", resourcesRequired:[{name:flawedRuby, amount:80}]});
const flawlessRuby = new Items({name:"Flawless Ruby Gemstone", bazaar:true, timeToCraft:0, id:"FLAWLESS_RUBY_GEM", resourcesRequired:[{name:fineRuby, amount:80}]});
const perfectRuby = new Items({name:"Perfect Ruby Gemstone", bazaar:true, timeToCraft:0, id:"PERFECT_RUBY_GEM", resourcesRequired:[{name:flawlessRuby, amount:5}]});

const roughJade = new Items({name:"Rough Jade Gemstone", bazaar:true, timeToCraft:0, id:"ROUGH_JADE_GEM"});
const flawedJade = new Items({name:"Flawed Jade Gemstone", bazaar:true, timeToCraft:0, id:"FLAWED_JADE_GEM", resourcesRequired:[{name:roughJade, amount:80}]});
const fineJade = new Items({name:"Fine Jade Gemstone", bazaar:true, timeToCraft:0, id:"FINE_JADE_GEM", resourcesRequired:[{name:flawedJade, amount:80}]});
const flawlessJade = new Items({name:"Flawless Jade Gemstone", bazaar:true, timeToCraft:0, id:"FLAWLESS_JADE_GEM", resourcesRequired:[{name:fineJade, amount:80}]});

const roughAmber = new Items({name:"Rough Amber Gemstone", bazaar:true, timeToCraft:0, id:"ROUGH_AMBER_GEM"});
const flawedAmber = new Items({name:"Flawed Amber Gemstone", bazaar:true, timeToCraft:0, id:"FLAWED_AMBER_GEM", resourcesRequired:[{name:roughAmber, amount:80}]});
const fineAmber = new Items({name:"Fine Amber Gemstone", bazaar:true, timeToCraft:0, id:"FINE_AMBER_GEM", resourcesRequired:[{name:flawedAmber, amount:80}]});
const flawlessAmber = new Items({name:"Flawless Amber Gemstone", bazaar:true, timeToCraft:0, id:"FLAWLESS_AMBER_GEM", resourcesRequired:[{name:fineAmber, amount:80}]});
const perfectAmber = new Items({name:"Perfect Amber Gemstone", bazaar:true, timeToCraft:0, id:"PERFECT_AMBER_GEM", resourcesRequired:[{name:flawlessAmber, amount:5}]});

const roughAmethyst = new Items({name:"Rough Amethyst Gemstone", bazaar:true, timeToCraft:0, id:"ROUGH_AMETHYST_GEM"});
const flawedAmethyst = new Items({name:"Flawed Amethyst Gemstone", bazaar:true, timeToCraft:0, id:"FLAWED_AMETHYST_GEM", resourcesRequired:[{name:roughAmethyst, amount:80}]});
const fineAmethyst = new Items({name:"Fine Amethyst Gemstone", bazaar:true, timeToCraft:0, id:"FINE_AMETHYST_GEM", resourcesRequired:[{name:flawedAmethyst, amount:80}]});
const flawlessAmethyst = new Items({name:"Flawless Amethyst Gemstone", bazaar:true, timeToCraft:0, id:"FLAWLESS_AMETHYST_GEM", resourcesRequired:[{name:fineAmethyst, amount:80}]});

const roughSapphire = new Items({name:"Rough Sapphire Gemstone", bazaar:true, timeToCraft:0, id:"ROUGH_SAPPHIRE_GEM"});
const flawedSapphire = new Items({name:"Flawed Sapphire Gemstone", bazaar:true, timeToCraft:0, id:"FLAWED_SAPPHIRE_GEM", resourcesRequired:[{name:roughSapphire, amount:80}]});
const fineSapphire = new Items({name:"Fine Sapphire Gemstone", bazaar:true, timeToCraft:0, id:"FINE_SAPPHIRE_GEM", resourcesRequired:[{name:flawedSapphire, amount:80}]});
const flawlessSapphire = new Items({name:"Flawless Sapphire Gemstone", bazaar:true, timeToCraft:0, id:"FLAWLESS_SAPPHIRE_GEM", resourcesRequired:[{name:fineSapphire, amount:80}]});
const perfectSapphire = new Items({name:"Perfect Sapphire Gemstone", bazaar:true, timeToCraft:0, id:"PERFECT_SAPPHIRE_GEM", resourcesRequired:[{name:flawlessSapphire, amount:5}]});

const roughOnyx = new Items({name:"Rough Onyx Gemstone", bazaar:true, timeToCraft:0, id:"ROUGH_ONYX_GEM"});
const flawedOnyx = new Items({name:"Flawed Onyx Gemstone", bazaar:true, timeToCraft:0, id:"FLAWED_ONYX_GEM", resourcesRequired:[{name:roughOnyx, amount:80}]});
const fineOnyx = new Items({name:"Fine Onyx Gemstone", bazaar:true, timeToCraft:0, id:"FINE_ONYX_GEM", resourcesRequired:[{name:flawedOnyx, amount:80}]});
const flawlessOnyx = new Items({name:"Flawless Onyx Gemstone",bazaar:true,timeToCraft:0,id:"FLAWLESS_ONYX_GEM",resourcesRequired:[{name:fineOnyx,amount:80}]});

const roughCitrine = new Items({name:"Rough Citrine Gemstone", bazaar:true, timeToCraft:0, id:"ROUGH_CITRINE_GEM"});
const flawedCitrine = new Items({name:"Flawed Citrine Gemstone", bazaar:true, timeToCraft:0, id:"FLAWED_CITRINE_GEM", resourcesRequired:[{name:roughCitrine, amount:80}]});
const fineCitrine = new Items({name:"Fine Citrine Gemstone", bazaar:true, timeToCraft:0, id:"FINE_CITRINE_GEM", resourcesRequired:[{name:flawedCitrine, amount:80}]});

const roughPeridot = new Items({name:"Rough Peridot Gemstone", bazaar:true, timeToCraft:0, id:"ROUGH_PERIDOT_GEM"});
const flawedPeridot = new Items({name:"Flawed Peridot Gemstone", bazaar:true, timeToCraft:0, id:"FLAWED_PERIDOT_GEM", resourcesRequired:[{name:roughPeridot, amount:80}]});
const finePeridot = new Items({name:"Fine Peridot Gemstone", bazaar:true, timeToCraft:0, id:"FINE_PERIDOT_GEM", resourcesRequired:[{name:flawedPeridot, amount:80}]});

const roughAquamarine = new Items({name:"Rough Aquamarine Gemstone", bazaar:true, timeToCraft:0, id:"ROUGH_AQUAMARINE_GEM"});
const flawedAquamarine = new Items({name:"Flawed Aquamarine Gemstone", bazaar:true, timeToCraft:0, id:"FLAWED_AQUAMARINE_GEM", resourcesRequired:[{name:roughAquamarine, amount:80}]});
const fineAquamarine = new Items({name:"Fine Aquamarine Gemstone", bazaar:true, timeToCraft:0, id:"FINE_AQUAMARINE_GEM", resourcesRequired:[{name:flawedAquamarine, amount:80}]});
const flawlessAquamarine = new Items({name:"Flawless Aquamarine Gemstone",bazaar:true,timeToCraft:0,id:"FLAWLESS_AQUAMARINE_GEM",resourcesRequired:[{name:fineAquamarine,amount:80}]});

const gemstoneMixture = new Items({name:"Gemstone Mixture", bazaar:true, timeToCraft:240, id:"GEMSTONE_MIXTURE", resourcesRequired:[{name:fineAmber, amount:4}, {name:fineAmethyst, amount:4}, {name:fineJade, amount:4}, {name:fineSapphire, amount:4}, {name:sludgeJuice, amount:320}]});

const glacite = new Items({name:"Glacite", bazaar:true, timeToCraft:0, id:"GLACITE"});
const enchantedGlacite = new Items({name:"Enchanted Glacite", bazaar:true, timeToCraft:0, id:"ENCHANTED_GLACITE", resourcesRequired:[{name:glacite, amount:160}]});

const glaciteAmalgamation = new Items({name:"Glacite Amalgamation", bazaar:true, timeToCraft:240, id:"GLACITE_AMALGAMATION", resourcesRequired:[{name:enchantedGlacite, amount:256}, {name:fineAquamarine, amount:4}, {name:fineCitrine, amount:4}, {name:fineOnyx, amount:4}, {name:finePeridot, amount:4}]});

const mithrilPlate = new Items({name:"Mithril Plate", bazaar:true, timeToCraft:1080, id:"MITHRIL_PLATE", resourcesRequired:[{name:refinedTitanium, amount:1}, {name:refinedMithril, amount:5}, {name:goldenPlate, amount:1}, {name:enchantedIronBlock, amount:1}]});

const tungstenPlate = new Items({name:"Tungsten Plate", bazaar:true, timeToCraft:180, id:"TUNGSTEN_PLATE", resourcesRequired:[{name:refinedTungsten, amount:4}, {name:glaciteAmalgamation, amount:1}]});

const umberPlate = new Items({name:"Umber Plate", bazaar:true, timeToCraft:180, id:"UMBER_PLATE", resourcesRequired:[{name:refinedUmber, amount:4}, {name:glaciteAmalgamation, amount:1}]});

const perfectPlate = new Items({name:"Perfect Plate", bazaar:true, timeToCraft:30, id:"PERFECT_PLATE", resourcesRequired:[{name:tungstenPlate, amount:1}, {name:umberPlate, amount:1}, {name:mithrilPlate, amount:1}]});

const mithrilDrillSX_R226 = new Items({name:"Mithril Drill SX-R226", bazaar:false, timeToCraft:240, resourcesRequired:[{name:refinedMithril, amount:3}, {name:fuelCanister, amount:1}, {name:drillMotor, amount:1}]});

const mithrilDrillSX_R326 = new Items({name:"Mithril Drill SX-R326", bazaar:false, timeToCraft:0.5, resourcesRequired:[{name:mithrilDrillSX_R226, amount:1}, {name:goldenPlate, amount:1}, {name:mithrilPlate, amount:1}]});

const rubyDrillTX_15 = new Items({name:"Ruby Drill TX-15", bazaar:false, timeToCraft:240, resourcesRequired:[{name:fineRuby, amount:6}, {name:fuelCanister, amount:1}, {name:drillMotor, amount:1}]});

const gemstoneDrillLT_522 = new Items({name:"Gemstone Drill LT-522", bazaar:false, timeToCraft:0.5, resourcesRequired:[{name:rubyDrillTX_15, amount:1}, {name:gemstoneMixture, amount:3}]});

const magmaCore = new Items({name:"Magma Core", bazaar:true, timeToCraft:0, id:"MAGMA_CORE"});

const topazDrillKGR_12 = new Items({name:"Topaz Drill KGR-12", bazaar:false, timeToCraft:0.5, resourcesRequired:[{name:flawlessTopaz, amount:1}, {name:gemstoneDrillLT_522, amount:1}, {name:gemstoneMixture, amount:3}, {name:magmaCore, amount:8}]});

const jasperDrillX = new Items({name:"Jasper Drill X", bazaar:false, timeToCraft:0.5, resourcesRequired:[{name:topazDrillKGR_12, amount:1}, {name:flawlessJasper, amount:1}, {name:treasurite, amount:100}, {name:magmaCore, amount:16}]});

const topazRod = new Items({name:"Topaz Rod", bazaar:false, timeToCraft:720, resourcesRequired:[{name:flawlessTopaz, amount:2}, {name:bejeweledHandle, amount:3}]});

const plasma = new Items({name:"Plasma", bazaar:true, timeToCraft:0, id:"PLASMA"});
const corleonite = new Items({name:"Corleonite", bazaar:true, timeToCraft:0, id:"CORLEONITE"});
const divansAlloy = new Items({name:"Divan's Alloy", bazaar:false, timeToCraft:0});

const titaniumDrillDR_X355 = new Items({name:"Titanium Drill DR-X355", bazaar:false, timeToCraft:240, resourcesRequired:[{name:refinedTitanium, amount:8}, {name:refinedMithril, amount:8}, {name:drillMotor, amount:1}, {name:fuelCanister, amount:1}, {name:goldenPlate, amount:6}]});
const titaniumDrillDR_X455 = new Items({name:"Titanium Drill DR-X455", bazaar:false, timeToCraft:0.5, resourcesRequired:[{name:titaniumDrillDR_X355, amount:1}, {name:refinedDiamond, amount:10}, {name:refinedTitanium, amount:12}, {name:mithrilPlate, amount:5}]});
const titaniumDrillDR_X555 = new Items({name:"Titanium Drill DR-X555", bazaar:false, timeToCraft:0.5, resourcesRequired:[{name:titaniumDrillDR_X455, amount:1}, {name:refinedDiamond, amount:20}, {name:refinedTitanium, amount:16}, {name:enchantedIronBlock, amount:2}, {name:mithrilPlate, amount:10}, {name:plasma, amount:20}]});
const titaniumDrillDR_X655 = new Items({name:"Titanium Drill DR-X655", bazaar:false, timeToCraft:0.5, resourcesRequired:[{name:titaniumDrillDR_X555, amount:1}, {name:flawlessRuby, amount:1}, {name:corleonite, amount:30}, {name:refinedDiamond, amount:5}, {name:refinedTitanium, amount:32}, {name:gemstoneMixture, amount:16}, {name:mithrilPlate, amount:10}]});
const divansDrill = new Items({name:"Divan's Drill", bazaar:false, timeToCraft:0.5, resourcesRequired:[{name:titaniumDrillDR_X655, amount:1}, {name:divansAlloy, amount:1}]});

const chisel = new Items({name:"Chisel", bazaar:false, timeToCraft:240, resourcesRequired:[{name:bejeweledHandle, amount:1}, {name:tungsten, amount:64}]});
const reinforcedChisel = new Items({name:"Reinforced Chisel", bazaar:false, timeToCraft:0.5, resourcesRequired:[{name:chisel, amount:1}, {name:refinedTungsten, amount:2}, {name:refinedUmber, amount:2}, {name:bejeweledHandle, amount:1}]});
const glacite_PlatedChisel = new Items({name:"Glacite-Plated Chisel", bazaar:false, timeToCraft:0.5, resourcesRequired:[{name:reinforcedChisel, amount:1}, {name:glaciteAmalgamation, amount:8}, {name:mithrilPlate, amount:1}, {name:bejeweledHandle, amount:1}]});
const perfectChisel = new Items({name:"Perfect Chisel", bazaar:false, timeToCraft:0.5, resourcesRequired:[{name:glacite_PlatedChisel, amount:1}, {name:perfectPlate, amount:1}, {name:bejeweledHandle, amount:1}]});

const mithrilNecklace = new Items({name:"Mithril Necklace", bazaar:false, timeToCraft:60, resourcesRequired:[{name:enchantedMithril, amount:3}]})
const mithrilCloak = new Items({name:"Mithril Cloak", bazaar:false, timeToCraft:60, resourcesRequired:[{name:enchantedMithril, amount:3}]})
const mithrilBelt = new Items({name:"Mithril Belt", bazaar:false, timeToCraft:60, resourcesRequired:[{name:enchantedMithril, amount:3}]})
const mithrilGauntlet = new Items({name:"Mithril Gauntlet", bazaar:false, timeToCraft:60, resourcesRequired:[{name:enchantedMithril, amount:3}]})

const refinedMineral = new Items({name:"Refined Mineral", bazaar:true, timeToCraft:0, id:"REFINED_MINERAL"});
const glossyGemstone = new Items({name:"Glossy Gemstone", bazaar:true, timeToCraft:0, id:"GLOSSY_GEMSTONE"});

const titaniumNecklace = new Items({name:"Titanium Necklace", bazaar:false, timeToCraft:270, resourcesRequired:[{name:refinedMineral, amount:16}, {name:refinedTitanium, amount:1}, {name:mithrilNecklace, amount:1}]});
const titaniumCloak = new Items({name:"Titanium Cloak", bazaar:false, timeToCraft: 270, resourcesRequired:[{name:refinedMineral, amount:16}, {name:refinedTitanium, amount:1}, {name:mithrilCloak, amount:1}]});
const titaniumBelt = new Items({name:"Titanium Belt", bazaar:false, timeToCraft:270,resourcesRequired:[{name:refinedMineral, amount:16}, {name:refinedTitanium, amount:1}, {name:mithrilBelt, amount:1}]})
const titaniumGauntlet = new Items({name:"Titanium Gauntlet", bazaar:false, timeToCraft:270, resourcesRequired:[{name:refinedMineral, amount:16}, {name:refinedTitanium, amount:1}, {name:mithrilGauntlet, amount:1}]})

const titaniumTalisman = new Items({name:"Titanium Talisman", bazaar:false, timeToCraft:840, resourcesRequired:[{name:refinedTitanium, amount:2}]});
const titaniumRing = new Items({name:"Titanium Ring", bazaar:false, timeToCraft:1200,resourcesRequired:[{name:titaniumTalisman, amount:1}, {name:refinedTitanium, amount:6}]});
const titaniumArtifact = new Items({name:"Titanium Artifact", bazaar:false, timeToCraft:2160, resourcesRequired:[{name:titaniumRing, amount:1}, {name:refinedTitanium, amount:12}]});
const titaniumRelic = new Items({name:"Titanium Relic", bazaar:false, timeToCraft:4320, resourcesRequired:[{name:titaniumArtifact, amount:1}, {name:refinedTitanium, amount:20}]});

const divanFragments = new Items({name:"Divan Fragments",bazaar:true,timeToCraft:0,id:"DIVAN_FRAGMENT"});

const divansPowderCoating = new Items({name:"Divan's Powder Coating", bazaar:true, timeToCraft:720,id:"DIVAN_POWDER_COATING",resourcesRequired:[{name:glossyGemstone, amount:32}, {name:refinedMineral, amount:32}, {name:enchantedGoldBlock, amount:16}, {name:divanFragments, amount:5}]});
const helmetOfDivan = new Items({name:"Helmet of Divan", bazaar:false, timeToCraft:1440, resourcesRequired:[{name:flawlessRuby, amount:1}, {name:divanFragments, amount:5}, {name:gemstoneMixture, amount:10}]});
const chestplateOfDivan = new Items({name:"Chestplate of Divan", bazaar:false, timeToCraft:1440, resourcesRequired:[{name:flawlessRuby, amount:1}, {name:divanFragments, amount:8}, {name:gemstoneMixture, amount:10}]});
const leggingsOfDivan = new Items({name:"Leggings of Divan", bazaar:false,timeToCraft:1440, resourcesRequired:[{name:flawlessRuby, amount:1}, {name:divanFragments, amount:7}, {name:gemstoneMixture, amount:10}]});
const bootsOfDivan = new Items({name:"Boots of Divan", bazaar:false, timeToCraft:1440, resourcesRequired:[{name:flawlessRuby, amount:1}, {name:divanFragments, amount:4}, {name:gemstoneMixture, amount:10}]});

const amberNecklace = new Items({name:"Amber Necklace", bazaar:false, timeToCraft:1440,resourcesRequired:[{name:glossyGemstone, amount:32}, {name:flawlessAmber, amount:2}]});
const sapphireCloak = new Items({name:"Sapphire Cloak", bazaar:false, timeToCraft:1440,resourcesRequired:[{name:glossyGemstone, amount:32}, {name:flawlessSapphire, amount:2}]});
const jadeBelt = new Items({name:"Jade Belt", bazaar:false, timeToCraft:1440,resourcesRequired:[{name:glossyGemstone, amount:32}, {name:flawlessJade, amount:2}]});
const amethystGauntlet = new Items({name:"Amethyst Gauntlet", bazaar:false, timeToCraft:1440, resourcesRequired:[{name:glossyGemstone, amount:32}, {name:flawlessAmethyst, amount:2}]})

const wormMembrane = new Items({name:"Worm Membrane", bazaar:true, timeToCraft:0, id:"WORM_MEMBRANE"});
const gemstoneChamber = new Items({name:"Gemstone Chamber", bazaar:false, timeToCraft:240,resourcesRequired:[{name:wormMembrane, amount:100},{name:gemstoneMixture, amount:1}]});

const dwarvernHandwarmers = new Items({name:"Dwarven Handwarmers", bazaar:false, timeToCraft:240,resourcesRequired:[{name:flawlessJade, amount:1}, {name:flawlessAmber, amount:1}, {name:tungstenPlate, amount:1}, {name:umberPlate, amount:1}]});

const shatteredLocket = new Items({name:"Shattered Locket", bazaar:false, timeToCraft:0});

const pendantOfDivan = new Items({name:"Pendant of Divan", bazaar:false, timeToCraft:10080, resourcesRequired:[{name:perfectPlate, amount:1}, {name:divanFragments, amount:10}, {name:shatteredLocket, amount:1}]});

const diamonite = new Items({name:"Diamonite", bazaar:true,timeToCraft:360,id:"DIAMONITE",resourcesRequired:[{name:refinedDiamond, amount:3}]});
const pocketIceberg = new Items({name:"Glacite Jewel", bazaar:true, timeToCraft:360, id:"POCKET_ICEBERG",resourcesRequired:[{name:glaciteJewel, amount:5}]});

const starfall = new Items({name:"Starfall", bazaar:true,timeToCraft:0,id:"STARFALL"});
const petrifiedStarfall = new Items({name:"Petrified Starfall", bazaar:true,timeToCraft:360,id:"PETRIFIED_STARFALL",resourcesRequired:[{name:starfall,amount:512}]});

const pureMithril = new Items({name:"Pure Mithril", bazaar:true, timeToCraft:360, id:"PURE_MITHRIL",resourcesRequired:[{name:refinedMithril, amount:2}]});

const cobblestone = new Items({name:"Cobblestone",bazaar:true,timeToCraft:0,id:"COBBLESTONE"});
const enchantedCobblestone = new Items({name:"Enchanted Cobblestone",bazaar:true,timeToCraft:0,id:"ENCHANTED_COBBLESTONE",resourcesRequired:[{name:cobblestone,amount:160}]});

const dwarvernGeode = new Items({name:"Dwarvern Geode", bazaar:true,timeToCraft:360,id:"ROCK_GEMSTONE",resourcesRequired:[{name:enchantedCobblestone,amount:128},{name:treasurite,amount:64}]});

const lapis = new Items({name:"Lapis Lazuli", bazaar:true,timeToCraft:0,id:"INK_SACK:4"});
const enchantedLapis = new Items({name:"Enchanted Lapis Lazuli",bazaar:true,timeToCraft:0,id:"ENCHANTED_LAPIS_LAZULI",resourcesRequired:[{name:lapis,amount:160}]});
const titaniumTesseract = new Items({name:"Titanium Tesseract", bazaar:true,timeToCraft:360,id:"TITANIUM_TESSERACT",resourcesRequired:[{name:refinedTitanium,amount:1},{name:enchantedLapis,amount:16}]});

const gleamingCrystal = new Items({name:"Gleaming Crystal",bazaar:true,timeToCraft:360,id:"GLEAMING_CRYSTAL",resourcesRequired:[{name:glossyGemstone,amount:32},{name:refinedMineral,amount:1},{name:refinedDiamond,amount:2}]});

const hardStone = new Items({name:"Hard Stone", bazaar:true,timeToCraft:0,id:"HARD_STONE"});
const enchantedHardStone = new Items({name:"Enchanted Hard Stone", bazaar:true,timeToCraft:0,id:"ENCHANTED_HARD_STONE",resourcesRequired:[{name:hardStone,amount:576}]});
const scorchedTopaz = new Items({name:"Scorched Topaz",bazaar:true,timeToCraft:360,id:"HOT_STUFF",resourcesRequired:[{name:enchantedHardStone,amount:128},{name:flawlessTopaz,amount:1}]});
const amberMaterial = new Items({name:"Amber Material", bazaar:true,timeToCraft:360,id:"AMBER_MATERIAL",resourcesRequired:[{name:fineAmber,amount:12},{name:goldenPlate,amount:1}]});
const frigidHusk = new Items({name:"Frigid Husk", bazaar:true,timeToCraft:360,id:"FRIGID_HUSK",resourcesRequired:[{name:glaciteAmalgamation,amount:4},{name:flawlessOnyx,amount:1}]});

const starfallSeasoning = new Items({name:"Starfall Seasoning", bazaar:false,timeToCraft:1080,resourcesRequired:[{name:treasurite,amount:16},{name:starfall,amount:64}]});

const goblinEgg = new Items({name:"Goblin Egg", bazaar:true,timeToCraft:0,id:"GOBLIN_EGG"});
const goblinOmelette = new Items({name:"Goblin Omelette", bazaar:false, timeToCraft:1080,resourcesRequired:[{name:goblinEgg,amount:96}]});

const redGoblinEgg = new Items({name:"Red Goblin Egg", bazaar:true,timeToCraft:0,id:"GOBLIN_EGG_RED"});
const spicyGoblinOmelette = new Items({name:"Spicy Goblin Omelette", bazaar:false,timeToCraft:1080,resourcesRequired:[{name:redGoblinEgg,amount:96},{name:flawlessRuby,amount:1},{name:goblinOmelette,amount:1}]});

const greenGoblinEgg = new Items({name:"Green Goblin Egg", bazaar:true, timeToCraft:0,id:"GOBLIN_EGG_GREEN"});
const pestoGoblinOmelette = new Items({name:"Pesto Goblin Omelette",bazaar:false,timeToCraft:1080,resourcesRequired:[{name:greenGoblinEgg,amount:96},{name:flawlessJade,amount:1},{name:goblinOmelette,amount:1}]});

const yellowGoblinEgg = new Items({name:"Yellow Goblin Egg", bazaar:true,timeToCraft:0,id:"GOBLIN_EGG_YELLOW"});
const sunnySideGoblinOmelette = new Items({name:"Sunny Side Goblin Omelette",bazaar:false,timeToCraft:1080,resourcesRequired:[{name:yellowGoblinEgg,amount:96},{name:flawlessTopaz,amount:1},{name:goblinOmelette,amount:1}]});

const blueGoblinEgg = new Items({name:"Blue Goblin Egg", bazaar:true,timeToCraft:0,id:"GOBLIN_EGG_BLUE"});
const blueCheeseGoblinOmelette = new Items({name:"Blue Cheese Goblin Omelette", bazaar:false,timeToCraft:1080,resourcesRequired:[{name:blueGoblinEgg,amount:96},{name:flawlessSapphire,amount:1},{name:goblinOmelette,amount:1}]});

const tungstenRegulator = new Items({name:"Tungsten Regulator", bazaar:false,timeToCraft:1080,resourcesRequired:[{name:perfectOpal,amount:1},{name:fuelCanister,amount:5},{name:tungstenPlate,amount:5}]});
const mithril_PlatedDrillEngine = new Items({name:"Mithril-Plated Drill Engine", bazaar:false,timeToCraft:1440,resourcesRequired:[{name:drillMotor,amount:2},{name:mithrilPlate,amount:1}]});
const titanium_PlatedDrillEngine = new Items({name:"Titanium-Plated Drill Engine", bazaar:false,timeToCraft:0.5,resourcesRequired:[{name:mithril_PlatedDrillEngine,amount:1},{name:refinedTitanium,amount:8},{name:drillMotor,amount:2}]});
const precursorApparatus = new Items({name:"Precursor Apparatus", bazaar:true,timeToCraft:0,id:"PRECURSOR_APPARATUS"});
const ruby_PolishedDrillEngine = new Items({name:"Ruby-Polished Drill Engine", bazaar:false,timeToCraft:0.5,resourcesRequired:[{name:titanium_PlatedDrillEngine,amount:1},{name:perfectRuby,amount:1},{name:precursorApparatus,amount:4},{name:drillMotor,amount:5}]});
const sapphire_PolishedDrillEngine = new Items({name:"Sapphire-Polished Drill Engine",bazaar:false,timeToCraft:0.5,resourcesRequired:[{name:ruby_PolishedDrillEngine,amount:1},{name:perfectSapphire, amount:3},{name:precursorApparatus,amount:8},{name:drillMotor,amount:5},{name:plasma,amount:16}]});
const amber_PolishedDrillEngine = new Items({name:"Amber-Polished Drill Engine", bazaar:false,timeToCraft:0.5,resourcesRequired:[{name:sapphire_PolishedDrillEngine,amount:1},{name:perfectAmber,amount:5},{name:precursorApparatus,amount:16},{name:drillMotor,amount:5},{name:plasma,amount:32}]});
const mithril_InfusedFuelTank = new Items({name:"Mithril-Infused Fuel Tank",bazaar:false,timeToCraft:1440,resourcesRequired:[{name:refinedDiamond,amount:5},{name:refinedMithril,amount:10},{name:fuelCanister,amount:5}]});
const titanium_InfusedFuelTank = new Items({name:"Titanium-Infused Fuel Tank",bazaar:false,timeToCraft:0.5,resourcesRequired:[{name:mithril_InfusedFuelTank,amount:1},{name:refinedTitanium,amount:10},{name:refinedDiamond,amount:5},{name:fuelCanister,amount:5}]});
const gemstoneFuelTank = new Items({name:"Gemstone Fuel Tank",bazaar:false,timeToCraft:0.5,resourcesRequired:[{name:titanium_InfusedFuelTank,amount:1},{name:precursorApparatus,amount:4},{name:gemstoneMixture,amount:10}]});
const perfectly_CutFuelTank = new Items({name:"Perfectly-Cut Fuel Tank",bazaar:false,timeToCraft:0.5,resourcesRequired:[{name:gemstoneFuelTank,amount:1},{name:precursorApparatus,amount:16},{name:gemstoneMixture,amount:25},{name:plasma,amount:32}]});

const bejeweledCollar = new Items({name:"Bejeweled Collar", bazaar:false, timeToCraft:120,resourcesRequired:[{name:refinedMithril,amount:4},{name:bejeweledHandle,amount:1}]});
const clawFossil = new Items({name:"Claw Fossil",bazaar:false,timeToCraft:0});
const molePet = new Items({name:"Mole", bazaar:false,timeToCraft:4320,resourcesRequired:[{name:clawFossil,amount:1}]});
const helixFossil = new Items({name:"Helix Fossil", bazaar:false,timeToCraft:0});
const ammonitePet = new Items({name:"Ammonite", bazaar:false,timeToCraft:4320,resourcesRequired:[{name:helixFossil,amount:1}]});
const webbedFossil = new Items({name:"Webbed Fossil", bazaar:false, timeToCraft:0});
const penguinPet = new Items({name:"Penguin", bazaar:false,timeToCraft:10080,resourcesRequired:[{name:webbedFossil,amount:1},{name:flawlessAquamarine, amount:1}]});
const footprintFossil = new Items({name:"Spine Fossil", bazaar:false,timeToCraft:0});
const t_RexPet = new Items({name:"T-Rex", bazaar:false,timeToCraft:10080,resourcesRequired:[{name:footprintFossil,amount:1},{name:flawlessOnyx,amount:1}]});
const spineFossil = new Items({name:"Spine Fossil", bazaar:false, timeToCraft:0});
const spinosaurusPet = new Items({name:"Spinosaurus",bazaar:false,timeToCraft:10080,resourcesRequired:[{name:spineFossil,amount:1},{name:flawlessAquamarine,amount:1}]});
const uglyFossil = new Items({name:"Ugly Fossil", bazaar:false,timeToCraft:0});
const goblinPet = new Items({name:"] Goblin",bazaar:false,timeToCraft:10080,resourcesRequired:[{name:uglyFossil,amount:1},{name:flawlessAmber,amount:1}]});
const clubbedFossil = new Items({name:"Clubbed Fossil", bazaar:false,timeToCraft:0});
const ankylosaurusPet = new Items({name:"Ankylosaurus", bazaar:false,timeToCraft:10080,resourcesRequired:[{name:clubbedFossil,amount:1},{name:flawlessOpal,amount:1}]});
const tuskFossil = new Items({name:"Tusk Fossil", bazaar:false,timeToCraft:0});
const mammothPet = new Items({name:"Mammoth", bazaar:false,timeToCraft:10080,resourcesRequired:[{name:tuskFossil,amount:1},{name:flawlessOnyx,amount:1}]});

const beacon = new Items({name:"Beacon I", bazaar:false,timeToCraft:0});
const beacon2 = new Items({name:"Beacon II", bazaar:false,timeToCraft:1200,resourcesRequired:[{name:beacon,amount:1},{name:refinedMithril,amount:5}]});
const beacon3 = new Items({name:"Beacon III",bazaar:false,timeToCraft:1800,resourcesRequired:[{name:beacon2,amount:1},{name:refinedMithril, amount:10}]});
const beacon4 = new Items({name:"Beacon IV", bazaar:false,timeToCraft:2400,resourcesRequired:[{name:beacon3,amount:1},{name:refinedMithril,amount:20},{name:plasma,amount:1}]});
const beacon5 = new Items({name:"Beacon V", bazaar:false, timeToCraft:3000,resourcesRequired:[{name:beacon4,amount:1},{name:refinedMithril,amount:40},{name:plasma,amount:5}]});

const enchantedEnderPearl = new Items({name:"Enchanted Ender Pearl",bazaar:true,timeToCraft:0,id:"ENCHANTED_ENDER_PEARL"});
const travelScrollDwarvenForge = new Items({
  name: "Travel Scroll To The Dwarven Forge",
  bazaar: false,
  timeToCraft: 300,
  resourcesRequired: [
    { name: titanium, amount: 80 },
    { name: enchantedEnderPearl, amount: 16 },
    { name: mithril, amount: 48 },
  ]
});

const travelScrollDwarvenBaseCamp = new Items({
  name: "Dwarven Base Camp",
  bazaar: false,
  timeToCraft: 600, 
  resourcesRequired: [
    { name: flawlessOnyx, amount: 1 },
    { name: enchantedEnderPearl, amount: 16 },
  ]
});

const powerCrystal = new Items({
  name: "Power Crystal",
  bazaar: true,
  timeToCraft: 120,
  id: "POWER_CRYSTAL",
  resourcesRequired: [
    { name: starfall, amount: 256 }
  ]
});

const secretRailroadPass = new Items({
  name: "Secret Railroad Pass",
  bazaar: false,
  timeToCraft: 0.5,
  resourcesRequired: [
    { name: flawlessRuby, amount: 1 },
    { name: refinedMithril, amount: 2 },
    { name: corleonite, amount: 8 }
  ]
});

const tungstenKey = new Items({
  name: "Tungsten Key",
  bazaar: true,
  timeToCraft: 0.5,
  id: "TUNGSTEN_KEY",
  resourcesRequired: [
    { name: enchantedTungsten, amount: 192 },
    { name: bejeweledHandle, amount: 1 }
  ]
});

const umberKey = new Items({
  name: "Umber Key",
  bazaar: true,
  timeToCraft: 0.5,
  id: "UMBER_KEY",
  resourcesRequired: [
    { name: enchantedUmber, amount: 192 },
    { name: bejeweledHandle, amount: 1 }
  ]
});

const skeletonKey = new Items({
  name: "Skeleton Key",
  bazaar: true,
  timeToCraft: 30,
  id: "SKELETON_KEY",
  resourcesRequired: [
    { name: perfectPlate, amount: 1 },
    { name: bejeweledHandle, amount: 1 }
  ]
});

const matchSticks = new Items({name:"Match-Sticks",bazaar:true,timeToCraft:0,id:"MATCH_STICKS"});

const portableCampfire = new Items({
  name: "Portable Campfire",
  bazaar: false,
  timeToCraft: 30,
  id: "PORTABLE_CAMPFIRE",
  resourcesRequired: [
    { name: refinedUmber, amount: 1 },
    { name: matchSticks, amount: 16 }
  ]
});

const forgeItems: Array<Hotm> = [
    {name:skeletonKey,hotm:10},
    {name:portableCampfire,hotm:8},
    {name:tungstenKey,hotm:7},
    {name:umberKey,hotm:7},
    {name:secretRailroadPass,hotm:7},
    {name:powerCrystal,hotm:2},
    {name:travelScrollDwarvenBaseCamp,hotm:7},
    {name:travelScrollDwarvenForge,hotm:2},
    {name:beacon5,hotm:5},
    {name:beacon4,hotm:4},
    {name:beacon3,hotm:3},
    {name:beacon2,hotm:2},
    {name:mammothPet,hotm:7},
    {name:ankylosaurusPet,hotm:7},
    {name:goblinPet,hotm:7},
    {name:spinosaurusPet, hotm:7},
    {name:t_RexPet, hotm:7},
    {name:penguinPet,hotm:7},
    {name:ammonitePet,hotm:4},
    {name:molePet,hotm:4},
    {name:bejeweledCollar,hotm:2},
    {name:perfectly_CutFuelTank,hotm:8},
    {name:gemstoneFuelTank,hotm:7},
    {name:titanium_InfusedFuelTank,hotm:5},
    {name:mithril_InfusedFuelTank,hotm:3},
    {name:amber_PolishedDrillEngine,hotm:9},
    {name:sapphire_PolishedDrillEngine,hotm:8},
    {name:ruby_PolishedDrillEngine,hotm:7},
    {name:titanium_PlatedDrillEngine,hotm:5},
    {name:mithril_PlatedDrillEngine,hotm:3},
    {name:tungstenRegulator,hotm:8},
    {name:blueCheeseGoblinOmelette,hotm:5},
    {name:sunnySideGoblinOmelette,hotm:5},
    {name:pestoGoblinOmelette,hotm:5},
    {name:spicyGoblinOmelette,hotm:5},
    {name:goblinOmelette,hotm:3},
    {name:starfallSeasoning,hotm:2},
    {name:frigidHusk,hotm:7},
    {name:amberMaterial,hotm:6},
    {name:scorchedTopaz,hotm:4},
    {name:gleamingCrystal,hotm:4},
    {name:titaniumTesseract,hotm:3},
    {name:dwarvernGeode,hotm:3},
    {name:pureMithril,hotm:3},
    {name:petrifiedStarfall,hotm:3},
    {name:diamonite,hotm:2},
    {name:pocketIceberg,hotm:2},
    {name:dwarvernHandwarmers,hotm:8},
    {name:pendantOfDivan,hotm:10},
    {name:gemstoneChamber,hotm:5},
    {name:amberNecklace, hotm:5},
    {name:sapphireCloak, hotm:5},
    {name:jadeBelt, hotm:5},
    {name:amethystGauntlet, hotm:5},
    {name:helmetOfDivan, hotm:6},
    {name:chestplateOfDivan, hotm:6},
    {name:leggingsOfDivan,hotm:6},
    {name:bootsOfDivan,hotm:6},
    {name:divansPowderCoating,hotm:4},
    {name:titaniumRelic,hotm:5},
    {name:titaniumArtifact,hotm:4},
    {name:titaniumRing,hotm:3},
    {name:titaniumTalisman,hotm:2},
    { name: titaniumNecklace, hotm: 3},
    { name: titaniumCloak, hotm: 3},
    { name: titaniumBelt, hotm: 3},
    { name: titaniumGauntlet, hotm: 3},
    { name: refinedMithril, hotm: 2 },
    { name: refinedDiamond, hotm: 2 },
    { name: refinedTitanium, hotm: 2 },
    { name: refinedUmber, hotm: 7 },
    { name: refinedTungsten, hotm: 7 },
    { name: bejeweledHandle, hotm: 2 },
    { name: goldenPlate, hotm: 2 },
    { name: drillMotor, hotm: 2 },
    { name: fuelCanister, hotm: 2 },
    { name: gemstoneMixture, hotm: 4 },
    { name: glaciteAmalgamation, hotm: 7 },
    { name: mithrilPlate, hotm: 3 },
    { name: tungstenPlate, hotm: 7 },
    { name: umberPlate, hotm: 7 },
    { name: perfectPlate, hotm: 10 },
    { name: mithrilDrillSX_R226, hotm: 2 },
    { name: mithrilDrillSX_R326, hotm: 3 },
    { name: rubyDrillTX_15, hotm: 4 },
    { name: gemstoneDrillLT_522, hotm: 4 },
    { name: topazDrillKGR_12, hotm: 5 },
    { name: jasperDrillX, hotm: 6 },
    { name: topazRod, hotm: 5 },
    { name: titaniumDrillDR_X355, hotm: 5 },
    { name: titaniumDrillDR_X455, hotm: 5 },
    { name: titaniumDrillDR_X555, hotm: 5 },
    { name: titaniumDrillDR_X655, hotm: 6 },
    { name: divansDrill, hotm: 7 },
    { name: chisel, hotm: 7 },
    { name: reinforcedChisel, hotm: 8 },
    { name: glacite_PlatedChisel, hotm: 9 },
    { name: perfectChisel, hotm: 10 },
    { name: mithrilNecklace, hotm: 1 },
    { name: mithrilBelt, hotm: 1 },
    { name: mithrilCloak, hotm: 1 },
    { name: mithrilGauntlet, hotm: 1 },
];

let reforgeAbleItems: Array<Items> = [
    beacon2,
    beacon3,
    beacon4,
    beacon5,
    mammothPet,
    ankylosaurusPet,
    goblinPet,
    spinosaurusPet,
    t_RexPet,
    mithrilDrillSX_R226,
    mithrilDrillSX_R326,
    rubyDrillTX_15,
    gemstoneDrillLT_522,
    topazDrillKGR_12,
    jasperDrillX,
    topazRod,
    titaniumDrillDR_X355,
    titaniumDrillDR_X455,
    titaniumDrillDR_X555,
    titaniumDrillDR_X655,
    divansDrill,
    mithrilBelt,
    mithrilCloak,
    mithrilGauntlet,
    mithrilNecklace,
    titaniumNecklace,
    titaniumCloak,
    titaniumBelt,
    titaniumGauntlet,
    helmetOfDivan,
    chestplateOfDivan,
    leggingsOfDivan,
    bootsOfDivan,
    amberNecklace,
    amethystGauntlet,
    sapphireCloak,
    jadeBelt,
    dwarvernHandwarmers,
    pendantOfDivan,
    molePet,
    ammonitePet,
    penguinPet,
]

export default function ForgeData() {
    const [auctionsData, setAuctionsData] = useState<Map<string, number>>(new Map());
    const [bazaarData, setBazaarData] = useState<ProcessedBazaarData>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [bazaarTaxRate, setTaxRate] = useState<number>(0.0125); //my own value, this depends on account

    const formatNumber = (num: number | null): string => {
        if (num === null || isNaN(num)) return 'N/A';
        if (num < 1000) return num.toLocaleString();
        if (num < 1000000) return `${(num / 1000).toFixed(1)}k`;
        if (num < 1000000000) return `${(num / 1000000).toFixed(2)}M`;
        return `${(num / 1000000000).toFixed(2)}B`;
    };

    const formatTime = (num: number): string => {
        if (num < 1) return `${num * 60}s`;
        if (num < 60) return `${num}m`;
        if (num < 1440) return `${Math.round(num/60 * 10) / 10}h`
        if (!(num/60 % 24)) return `${Math.floor(num/60/24)}d`
        return `${Math.floor(num/60/24)}d, ${Math.round((num/60 % 24) * 10)/10}h`
    }

    useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        console.log("Starting data fetch...");

        const [auctions, rawBazaarData] = await Promise.all([
        getAuctionsData(),
        getBazaarData()
        ]);

        const processedAuctions = new Map(auctions);

        const reforgeableBaseNames = reforgeAbleItems.map(item => item.getName());
        const lowestReforgePrices = new Map<string, number>();

        for (const [auctionItemName, price] of auctions.entries()) {
            for (const baseName of reforgeableBaseNames) {
                if (auctionItemName.includes(baseName)) {
                    const currentLowest = lowestReforgePrices.get(baseName);
                    if (!currentLowest || price < currentLowest) {
                        lowestReforgePrices.set(baseName, price);
                    }
                    break;
                }
            }
        }

        for (const [baseName, lowestPrice] of lowestReforgePrices.entries()) {
            processedAuctions.set(baseName, lowestPrice);
        }

        setAuctionsData(processedAuctions);
        console.log("Auction data fetched.");

        const processedBazaar: ProcessedBazaarData = {};
        for (const productId in rawBazaarData) {
        const product = rawBazaarData[productId];
        const sellSummary = product.sell_summary?.[0];
        const buySummary = product.buy_summary?.[0];
        
        processedBazaar[productId] = {
            sellPrice: sellSummary?.pricePerUnit,
            buyPrice: buySummary?.pricePerUnit
        };
        }
        setBazaarData(processedBazaar);
        console.log("Bazaar data processed.");

        setIsLoading(false);
        console.log("Data fetching complete.");
    };

    fetchData();
    }, []);

    const forgeItemsFilled: almostThere[] = forgeItems.map(value => {
        const itemSalePrice = value.name.getCost(auctionsData, bazaarData);
        let itemMaterialCost = value.name.getPartialMaterialCost(auctionsData, bazaarData);

        if (value.name.getName() === "Divan's Drill") {
            itemMaterialCost = (itemMaterialCost ?? 0) + 50000000;
        }

        if (value.name.getName() === "Gemstone Chamber" || value.name.getName() === "Travel Scroll To The Dwarven Forge") {
            itemMaterialCost = (itemMaterialCost ?? 0) + 25000;
        }

        if (value.name.getName() === "Mole" || value.name.getName() === "Ammonite") {
            itemMaterialCost = (itemMaterialCost ?? 0) + 300000;
        }

        if (value.name.getName() === "Travel Scroll To The Dwarvern Base Camp") {
            itemMaterialCost = (itemMaterialCost ?? 0) + 500000;
        }

        return {
            name: value.name,
            cost: itemSalePrice,
            materialCost: itemMaterialCost,
            hotm: value.hotm,
        };
    });

    const calculateProfit = (item: almostThere) => {
        let salesTaxRate;
        let p = ((item.cost !== undefined && item.materialCost !== undefined) ? item.cost - item.materialCost : -Infinity);
        if (item.name.getIfBazaar()) {
            return p - (item.cost ?? 0) * bazaarTaxRate;
        }
        if (!item.cost) {
            return null;
        }
        if (item.cost >= 100000000) {
            salesTaxRate = 0.025; 
        } else if (item.cost >= 10000000) {
            salesTaxRate = 0.02;
        } else {
            salesTaxRate = 0.01;
        }
        return p - (item.cost ?? 0) * salesTaxRate - (item.cost ?? 0) * 0.01;
    }

    const sortByProfit = () => {
        forgeItemsFilled.sort((a, b) => {
            const aProfit = calculateProfit(a) ?? -Infinity;
            const bProfit = calculateProfit(b) ?? -Infinity;

            return bProfit - aProfit;
        });
    }

    sortByProfit();

    const loadBody = () => {
        if (isLoading) return (<tr><td colSpan={7} className="px-4 py-5 text-center">Loading SkyBlock data...</td></tr>);
        return forgeItemsFilled.map((item) => (
        <tr key={item.name.getName()} className='border-t border-[#f38a32] dark:border-[#FDE9D8]'>
            <td className="w-2/5 lg:w-1/4 px-2 lg:px-4 py-5 break-words">
                {item.name.getName()} ({item.hotm})
            </td>
            <td className="w-full sm:w-1/5 lg:w-1/6 px-2 lg:px-4 py-5 text-center">
                <span className="lg:hidden">{formatNumber(calculateProfit(item))}</span>
                <span className="hidden lg:inline">{(calculateProfit(item) ?? 0).toLocaleString()}</span>
            </td>
            <td className="w-full sm:w-1/5 lg:w-1/6 px-2 lg:px-4 py-5 text-center">
                <span className="lg:hidden">{formatNumber((item.cost !== undefined) ? item.cost: -Infinity)}</span>
                <span className="hidden lg:inline">{((item.cost !== undefined) ? item.cost : -Infinity).toLocaleString()}</span>
            </td>
            <td className="w-full sm:w-1/5 lg:w-1/6 px-2 lg:px-4 py-5 text-center">
                <span className="lg:hidden">{formatNumber((item.materialCost !== undefined) ? item.materialCost : -Infinity)}</span>
                <span className="hidden lg:inline">{(item.materialCost !== undefined) ? (item.materialCost).toLocaleString() : 'N/A'}</span>
            </td>
            <td className="w-full sm:w-1/5 lg:w-1/6 px-2 lg:px-4 py-5 text-center">
                <span className="lg:hidden">{formatTime(item.name.getTimeToCraft())}</span>
                <span className="hidden lg:inline">{formatTime(item.name.getTimeToCraft())}</span>
            </td>
            <td className="w-full sm:w-1/5 lg:w-1/6 px-2 lg:px-4 py-5 text-center">
            <span className="lg:hidden">
                {formatNumber(
                ((calculateProfit(item) ?? 0) * 60) / item.name.getTimeToCraft()
                )}
            </span>
            <span className="hidden lg:inline">
                {(
                ((calculateProfit(item) ?? 0) * 60) / item.name.getTimeToCraft()
                ).toLocaleString()}
            </span>
            </td>
            <td className="w-full sm:w-1/5 lg:w-1/6 px-2 lg:px-4 py-5 text-center">
                <div className="lg:hidden">
                {item.name.getResources()
                    ? item.name.getResources()?.map(mt => (
                        <div key={mt.name.getName()}>
                        {`${mt.name.getName()} x${mt.amount}`}
                        </div>
                    ))
                    : 'N/A'}
                </div>

                <div className="hidden lg:inline">
                {item.name.getResources()
                    ? item.name.getResources()?.map(mt => (
                        <div key={mt.name.getName()}>
                        {`${mt.name.getName()} x${mt.amount}`}
                        </div>
                    ))
                    : 'N/A'}
                </div>
            </td>
        </tr>
        ))
    }

    return (
        <div className="mt-8 bg-[#FDE9D8] dark:bg-[#602E06] rounded-md overflow-x-auto">
            <table className="min-w-[600px] w-full text-left table-fixed">
                <thead>
                <tr>
                    <th className="w-full sm:w-2/5 lg:w-1/4 px-2 lg:px-4 py-3">Item (HOTM)</th>
                    <th className="w-1/2 sm:w-1/5 lg:w-1/6 px-2 lg:px-4 py-3 text-center">Profit</th>
                    <th className="w-1/2 sm:w-1/5 lg:w-1/6 px-2 lg:px-4 py-3 text-center">Item Cost</th>
                    <th className="w-1/2 sm:w-1/5 lg:w-1/6 px-2 lg:px-4 py-3 text-center">Material Cost</th>
                    <th className="w-1/2 sm:w-1/5 lg:w-1/6 px-2 lg:px-4 py-3 text-center">Time</th>
                    <th className="w-1/2 sm:w-1/5 lg:w-1/6 px-2 lg:px-4 py-3 text-center">Profit/Hr</th>
                    <th className="w-1/2 sm:w-1/5 lg:w-1/5 px-2 lg:px-4 py-3 text-center">Materials</th>
                </tr>
                </thead>
                <tbody>
                {loadBody()}
                </tbody>
            </table>
        </div>
    );
};