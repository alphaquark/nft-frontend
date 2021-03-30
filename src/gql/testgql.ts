import { gql } from '@apollo/client';

export const QUERY_SAMPLE = gql`
    query assetEvent($assetContractAddress: Address!, $tokenId: String!) {
        assetEvents(archetype: { assetContractAddress: $assetContractAddress, tokenId: $tokenId }, first: 10) {
            edges {
                node {
                    id
                    eventType
                    eventTimestamp
                    price {
                        id
                        quantity
                        relayId
                        asset {
                            symbol
                        }
                    }
                    toAccount {
                        address
                    }
                    fromAccount {
                        address
                    }
                }
            }
        }
    }
`;
