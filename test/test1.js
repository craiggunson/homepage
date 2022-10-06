import { Selector } from 'testcafe';

fixture `HomepageLoaded`
    .page('https://hello.craiggunson.com/index.html');

    test('HomepageLoaded', async t => {
        await t.expect(Selector('#index-banner > div > h1').innerText).eql('Craig Gunson');
    });


