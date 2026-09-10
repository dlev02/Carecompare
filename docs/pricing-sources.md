# U.S. pricing and coverage sources

Research date: September 9, 2026. All amounts below are USD, before tax.

## AppleCare One Family

[Apple's current AppleCare page](https://www.apple.com/applecare/) announces U.S. availability on September 14, 2026:

- $49.99/month for all eligible devices in a Family Sharing group of up to six people, including the subscriber; no extra device fees.
- Theft and loss applies to iPhone, iPad and Apple Watch, with six claims shared per year. Accidental damage repairs are unlimited; service fees and deductibles apply.
- Individual remains $19.99/month for up to three devices, plus $5.99/month each beyond three, with three shared theft/loss claims per year.
- Eligibility depends on device age, condition and account association. Apple's FAQ includes devices four years old or newer, headphones one year old or newer, and devices already covered by AppleCare+. A device check may be required. Model release year alone does not prove eligibility.

The [Apple support eligibility article](https://support.apple.com/en-us/122224) still describes Individual as of its August 4 update. The calculator follows the newer Family announcement and links to Apple for final eligibility. It does not change subscriptions or predict cancellation refunds.

## How current prices were verified

The model tables on Apple's AppleCare page contain plan SKU mappings. Prices are hydrated from Apple's public `https://www.apple.com/us/shop/mcm/product-price?parts=...` endpoint. Research matched each visible model to its monthly and annual SKU, then read the live price values. Internal SKU descriptions sometimes name older generations; the public model table establishes the intended product group.

| Newly announced model | Monthly | Annual | Monthly / annual SKU |
| --- | ---: | ---: | --- |
| iPhone 18 Pro / Pro Max | $14.99 | $149.99 | SHNP3 / SHNQ3 |
| Apple Watch Series 12 | $4.99 | $49.99 | SH3K3 / SH3F3 |
| Apple Watch Ultra 4 | $5.99 | $59.99 | SH403 / SH3V3 |
| AirPods 5 | $1.49 | $14.99 | SRPY2LL/A / SRQX2 |

[Apple pricing response for these models](https://www.apple.com/us/shop/mcm/product-price?parts=SHNP3,SHNQ3,SH3K3,SH3F3,SH403,SH3V3,SRPY2LL/A,SRQX2).

The new headphones are **AirPods 5**. AirPods Pro 3 remains in the current lineup. No verified AppleCare price was found for iPhone Duo, so it is not assigned a speculative rate or added as a priced model.

### Refreshed existing models

These are the rates returned for the corresponding public AppleCare model table entries. Other current entries were checked and unchanged.

| Model | Monthly | Annual |
| --- | ---: | ---: |
| iPhone 17e | $10.99 | $109.99 |
| iPhone 17 / iPhone 16 | $12.99 | $129.99 |
| iPhone Air | $14.99 | $149.99 |
| Mac mini | $3.99 | $39.99 |
| Mac Studio / iMac | $6.49 | $64.99 |
| MacBook Neo | $5.49 | $54.99 |
| MacBook Air 13-inch | $7.49 | $74.99 |
| MacBook Air 15-inch | $8.49 | $84.99 |
| MacBook Pro 14-inch | $10.49 | $104.99 |
| MacBook Pro 16-inch | $15.49 | $154.99 |
| iPad / iPad mini | $5.49 | $54.99 |
| iPad Air 11-inch M4 | $6.49 | $64.99 |
| iPad Air 13-inch M4 | $7.49 | $74.99 |
| iPad Pro 11-inch M5 | $10.49 | $104.99 |
| iPad Pro 13-inch M5 | $11.49 | $114.99 |

## Verified older hardware offers

Apple's live refurbished listings expose AppleCare plan choices and prices. These establish **current offers alongside refurbished hardware**, not historical subscription bills for existing owners. `pricingStatus: 'refurbished'` identifies them in the catalog.

| Model | Monthly | Annual | Primary source | Monthly / annual SKU |
| --- | ---: | ---: | --- | --- |
| MacBook Pro 14-inch M3 Max | $10.49 | $104.99 | [Apple refurbished](https://www.apple.com/shop/product/g1az0ll/a) | SRQG2LL/A / SL8H2LL/A |
| MacBook Pro 16-inch M3 Max | $15.49 | $154.99 | [Apple refurbished](https://www.apple.com/shop/product/g1cn7ll/a) | SU5P2LL/A / SL8J2LL/A |
| Apple Watch Series 9 Aluminum | $4.99 | $49.99 | [Apple refurbished](https://www.apple.com/shop/product/fr9a3lw/a) | SVX92LW/A / SW322LW/A |

[Apple pricing response for older hardware offers](https://www.apple.com/us/shop/mcm/product-price?parts=SRQG2LL/A,SL8H2LL/A,SU5P2LL/A,SL8J2LL/A,SVX92LW/A,SW322LW/A).

The Series 9 offer includes Theft and Loss. Mac plans cover AppleCare+ without theft/loss. Refurbished prices do not prove that an existing owner can purchase that exact plan today. The calculator exposes an actual current-bill override and marks device eligibility as an assumption.

## Retained reference prices

`pricingStatus: 'unrefreshed'` means an inherited catalog entry was not independently reverified in this update. This includes older iPhones, iPad 10th generation, Watch Ultra 2 / Series 10, AirPods Pro 2 / Max, Mac Pro, iPhone 16 Plus, and superseded iPhone 17 Pro, Watch 11 / Ultra 3 and AirPods 4 offers. Their old rates are retained for existing-device comparisons, displayed as **Older rate**, and must not be described as current verified offers. Coverage tiers may differ, particularly theft/loss on older phones and watches. Original purchase-era rates were not invented to fill missing data.

`legacy` describes hardware, independently of billing availability or One eligibility. Published annual prices are used only when present; no 10× monthly shortcut is applied. All calculations use integer annual cents; Annual mode uses verified annual prices where available, otherwise monthly × 12. One plans stay monthly in either mode.

## Complete current-table verification

Rechecked against the live HTML and pricing JSON during implementation. Both monthly and annual amounts are explicit values, not derived approximations.

| Public model label | Monthly | Annual | Monthly SKU | Annual SKU |
| --- | ---: | ---: | --- | --- |
| iPhone 17e | $10.99 | $109.99 | SD8K3 | SD8N3 |
| iPhone 17, iPhone 16 | $12.99 | $129.99 | SX3Y2 | SX4L2 |
| iPhone Air | $14.99 | $149.99 | SX432 | SX4Q2 |
| iPhone 18 Pro, iPhone 18 Pro Max | $14.99 | $149.99 | SHNP3 | SHNQ3 |
| Mac mini | $3.99 | $39.99 | SGDK3 | SGDN3 |
| Mac Studio | $6.49 | $64.99 | SGCX3 | SGD13 |
| iMac | $6.49 | $64.99 | SU4F2 | SR2W2 |
| MacBook Neo | $5.49 | $54.99 | SD6P3 | SD6M3 |
| MacBook Air 13-inch | $7.49 | $74.99 | SUXR2 | SUXF2 |
| MacBook Air 15-inch | $8.49 | $84.99 | SUXT2 | SUXG2 |
| MacBook Pro 14-inch | $10.49 | $104.99 | SXLE2LL/A | SXL72LL/A |
| MacBook Pro 16-inch | $15.49 | $154.99 | SRQN2 | SR2V2 |
| Studio Display | $4.99 | $49.99 | SD7R3 | SD7M3 |
| Studio Display XDR | $9.99 | $99.99 | SD7Q3 | SD7L3 |
| iPad, iPad mini | $5.49 | $54.99 | SW4U2LL/A | SW4V2LL/A |
| iPad Air 11-inch (M4) | $6.49 | $64.99 | SD8T3 | SD903 |
| iPad Air 13-inch (M4) | $7.49 | $74.99 | SD8U3 | SD913 |
| iPad Pro 11-inch (M5) | $10.49 | $104.99 | SXU72 | SXUG2 |
| iPad Pro 13-inch (M5) | $11.49 | $114.99 | SXU82 | SXUJ2 |
| Apple Watch SE 3 | $2.99 | $29.99 | SXJR2 | SXJV2 |
| Apple Watch Series 12 | $4.99 | $49.99 | SH3K3 | SH3F3 |
| Apple Watch Ultra 4 | $5.99 | $59.99 | SH403 | SH3V3 |
| Apple Watch Hermès Series 12 | $5.99 | $59.99 | SH733 | SH743 |
| Apple Watch Hermès Ultra | $5.99 | $59.99 | SH7C3 | SH7D3 |
| Apple Vision Pro | $19.99 | $199.99 | SLG72 | SQJD2 |
| AirPods 5, Beats | $1.49 | $14.99 | SRPY2LL/A | SRQX2 |
| AirPods Pro 3 | $1.99 | $19.99 | SYM82 | SYM92 |
| AirPods Max 2 | $2.99 | $29.99 | SQKL2LL/A | SQJ82 |
| Apple TV | $0.99 | $9.99 | SQKG2LL/A | SQJ42 |
| HomePod mini | $0.99 | $9.99 | SRPX2LL/A | SRQW2 |
| HomePod | $1.99 | $19.99 | SQKE2LL/A | SQJ22 |
