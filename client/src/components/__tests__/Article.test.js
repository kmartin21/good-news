import React from 'react'
import Article from '../Article'
import { shallow, mount } from 'enzyme'
import { Icon, Item, Modal } from 'semantic-ui-react'

describe('Article', () => {
    let props
    let shallowArticle

    beforeEach(() => {
        props = {
            title: 'New iphone',
            description: 'Apple building a new iphone for next year',
            url: 'https://www.apple.com',
            urlToImage: 'image.png',
            saved: false,
            toggleSaveArticle: jest.fn()
        }
        shallowArticle = shallow(<Article {...props} />)
    })

    it('should render a Item Group', () => {
        expect(shallowArticle.find(Item.Group).length).toBeGreaterThan(0)
    })

    describe('the rendered Item Group', () => {
        let props
        let shallowArticle

        beforeEach(() => {
            props = {
                title: 'New iphone',
                description: 'Apple building a new iphone for next year',
                url: 'https://www.apple.com',
                urlToImage: 'image.png',
                saved: false,
                toggleSaveArticle: jest.fn()
            }
            shallowArticle = shallow(<Article {...props} />)
        })

        it ('should contain everything else that gets rendered', () => {
            const components = shallowArticle.find(Item.Group)
            const wrappingItemGroup = components.first()

            expect(wrappingItemGroup.children()).toEqual(shallowArticle.children())
        })
    })

    it('should render a Item', () => {
        expect(shallowArticle.find(Item).length).toBeGreaterThan(0)
    })

    it('should render a Item Image', () => {
        expect(shallowArticle.find(Item.Image).length).toBeGreaterThan(0)
    }) 

    it('should set the image src to `urlToImage` prop', () => {
        expect(shallowArticle.find(Item.Image).props().src).toEqual(props.urlToImage)
    })

    it('should render a Item Content', () => {
        expect(shallowArticle.find(Item.Content).length).toBeGreaterThan(0)
    })

    it('should render a Item Header', () => {
        expect(shallowArticle.find(Item.Header).length).toBeGreaterThan(0)
    })

    it('should set the header to `url` prop', () => {
        expect(shallowArticle.find(Item.Header).props().href).toEqual(props.url)
    })

    it('should render a Item Description', () => {
        expect(shallowArticle.find(Item.Description).length).toBeGreaterThan(0)
    })

    it('should render a Item Extra', () => {
        expect(shallowArticle.find(Item.Extra).length).toBeGreaterThan(0)
    })

    it('should render a Icon', () => {
        let mountedArticle = mount(<Article {...props} />)
        expect(mountedArticle.find(Icon).length).toBeGreaterThan(0)
    })

    describe('when localStorage has a `googleId`', () => {
        let props
        let mountedArticle

        beforeEach(() => {
            props = {
                title: 'New iphone',
                description: 'Apple building a new iphone for next year',
                url: 'https://www.apple.com',
                urlToImage: 'image.png',
                saved: false,
                toggleSaveArticle: jest.fn()
            }
            mountedArticle = mount(<Article {...props} />)
        })

        beforeAll(() => {
            localStorage.setItem('googleId', '12345')
        })

        it('should set the Icon onClick', () => {
            expect(mountedArticle.find(Icon).prop('onClick')).toBeDefined()
        })

        it('should call `toggleSaveArticle` prop on click of Icon', () => {
            mountedArticle.find(Icon).simulate('click')
            expect(props.toggleSaveArticle).toBeCalled()
        })
    })

    describe('when localStorage does not have a `googleId`', () => {
        let props
        let mountedArticle

        beforeEach(() => {
            props = {
                title: 'New iphone',
                description: 'Apple building a new iphone for next year',
                url: 'https://www.apple.com',
                urlToImage: 'image.png',
                saved: false,
                toggleSaveArticle: jest.fn()
            }
            mountedArticle = mount(<Article {...props} />)
        })

        beforeAll(() => {
            localStorage.clear()
        })

        describe('when Icon is clicked', () => {
            it('should render a modal', () => {
                mountedArticle.find(Icon).simulate('click')
                expect(mountedArticle.find(Modal).length).toBeGreaterThan(0)
            })
        })
    })
})