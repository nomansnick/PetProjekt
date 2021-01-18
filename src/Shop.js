import React, { useState } from "react";
import styled from "styled-components";
import ItemList from "./Data/EnvData/items";

const FrameShop = styled.div`
display: flex;
margin-top: -15%;
height: 250%;
flex-direction: column;
justify-content: space-around;
text-align: center;
`;

const Goods = styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
`;

const ShopDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
`;

const OneItem = styled.div`
border: 1vh solid black;
display: flex;
flex-direction: column;
justify-content: space-between;
background-color: grey;
border-radius: 1vh;
width: 6vh;
height: 6vh;
`;

function Shop(props) {
    const { env, inv, purchase } = props
    const [shopkeeper, setShopKeeper] = useState("Welcome")
    const [items, setItems] = useState(ItemList)

    function buy(oneItem) {
        if (oneItem.faction) {
            switch (oneItem.tier) {
                case 1: shopCheckFaction(oneItem, 25)
                    break;
                case 2: shopCheckFaction(oneItem, 75)
                    break;
            }
            return;
        }
        if (!oneItem.faction) {
            shopCheckNoFaction(oneItem);
        }
    }

    function shopCheckFaction(oneItem, num) {
        if (env[oneItem.factionGiver] < num) {
            return setShopKeeper("You need to improve your standing with the " + oneItem.factionGiver + ".")
        }
        if (env.Gold < oneItem.price) {
            return setShopKeeper("Sorry, mate, you seem to be a tad too short on cash.")
        }
        if (oneItem.upgrade && inv.length > 0) {
            itemMatcher(oneItem);
        } else {
            purchase(oneItem)
            return setShopKeeper("Thank you for your purchase.")
        }
}

function itemMatcher(oneItem) {
    for (let i = 0; i < inv.length; i++) {
        if (inv[i].item == oneItem.item) {
            return setShopKeeper("Last I heard, you already have one of these. No need for more.")
        }
    }
    purchase(oneItem);
    return setShopKeeper("Thank you for your purchase.")
}

function shopCheckNoFaction(oneItem) {
    if (env.Gold < oneItem.price) {
        setShopKeeper("Sorry, mate, you seem to be a tad too short on cash.")
        return
    }
    if (oneItem.upgrade && inv.length > 0) {
        itemMatcher(oneItem)
    } else {
        purchase(oneItem)
        return setShopKeeper("Thank you for your purchase.")
    }
}

function comment() {
    return "Jezhel Silav: " + shopkeeper
}

return (
    <FrameShop>
        <div> Available Goods</div>
        <ShopDiv>
            <Goods>
                {items.map(oneItem => (
                    <OneItem key = {oneItem.id} onClick={() => buy(oneItem)}>
                        <div>{oneItem.item}</div>
                        <div>{oneItem.price}</div>
                    </OneItem>
                ))}
            </Goods>
        </ShopDiv>
        <div>{comment()}</div>

    </FrameShop>
)
}

export default Shop;