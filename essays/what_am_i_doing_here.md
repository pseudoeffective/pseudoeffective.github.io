# What Am I Doing Here?

*where do we come from? what are we? where are we going?*

***

In February 2018, I visited Ann Arbor to work with a longtime collaborator, and to give a talk in the University of Michigan algebraic geometry seminar.  The topic was quantum K-theory, one of the more technically intricate areas I've worked on; I think I did an ok job explaining the results, but it was far from my most engaging lecture.  In the smallish audience, one fellow seemed slightly out of place --- he didn't seem like a grad student, and I knew most of the faculty --- but he was paying attention assiduously, and maybe even taking notes.  At the end of the question period, when it seemed like everyone who wanted to ask had asked, he raised his hand and said something along the lines of, "This was all very fascinating, but way over my head, since I never really studied advanced math.  What is it that you are doing here?  Like, why do you all do it, are there applications to the real world?"

An awkward silence descended on the room, the dreaded question had been asked.  We mathematicians have come to expect this kind of conversation on airplanes, and from the external faculty member at thesis defenses, but here in a highly technical research seminar?  Where you have to reply in front of *other mathematicians*??  The fellow seemed earnestly interested in an answer, so I tried to affirm the importance of his question, while mumbling something about "probing the nature of what goes on in our minds" and "understanding the structure of human thought", and confessing I didn't really have a good answer.

Mathematicians need to articulate a good, honest answer to this question, and we need to do it clearly and publicly.

***

Amid the general gnashing of teeth and rending of garments, there's a common theme: the math abilities of the frontier models (Fable, Astra, whatever comes next) represent more than just a new technology, like calculators or computers, that require a period of adaptation but can be more or less easily digested and accommodated.  Rather, it cuts to the core of our values, the reasons many of us became mathematicians in the first place.  The idea that there's an oracle sitting just a few keystrokes away, ready and able to answer your deepest questions about mathematical objects you've spent years or decades studying --- this notion turns out to have a profound effect on the psychology of a mathematician.  Whether or not this describes current reality, the reaction over the last couple weeks indicates that even the *plausibility* of such an oracle is destabilizing.  (Surely it's at least partly true now, and maybe fully true soon.)

Like the guy in the Michigan seminar, though, the public at large does not understand what it is that we do.  That's not news to any of us, but the situation is worse: even the interested public, the smart and engaged observers, people who know and care about the Millennium Problems, who took proof-based math courses in college and use math in their work --- even they don't know what we value.  I'm talking about the tech industry here, yes, but I'm also talking about *us*.

I want to suggest that we take philosophy and sociology of mathematics more seriously; not that we need to agree on any particular view, only that it is *important and worthwhile* for a mathematician to engage in such things, and to write publicly about them.  If we don't define our subject to the public, others will, and we may not like the outcomes.

Mainly, I want to focus on the need for mathematicians to justify our field to the rest of society --- and in order to do that, the need for us to figure out among ourselves what we value.  The questions of what those values might be, and how they might serve to justify social support for academic math research, as well as the pressing issue of what internal incentives might structure the academic math profession, now that the ones currently in place are crumbling --- I'll defer to later essay(s) for attempts to answer those in detail.


***

I've thought about math pretty seriously for almost 25 years, and I've played with AI (not so seriously) for about 5 years.  For most of those five years of overlap, I wasn't putting the two together.  But about a year ago, that changed for me.

In late April 2025, I was nearing the end of a five-month membership at IAS.  It's a magical place for a mathematician, or any scholar.  You walk through the Institute Woods, where Einstein and Gödel walked; you browse the card-catalogued math library and see who last checked out the book you're holding; tea and coffee are served every afternoon in Fuld Hall and you get to chat with some of the smartest and most interesting people on earth.

Akshay Venkatesh was organizing a "Math+AI" event, with a visit from Alex Davies and the Google DeepMind Math team, and he advertised it to current IAS members.  I was by no means an AI expert or power user, but I'd spent a chunk of 2023 using LLMs to develop some software packages to aid research in Schubert calculus.  And by 2025, there was plenty of buzz (though also plenty of skepticism), so I was excited to see what would happen.  I expected to see some cool new tools to play with, some new ideas to try out, maybe an enlightening explanation of how what they build works.

All of that was delivered, and more.  All the visitors from the DeepMind group were extremely impressive, in terms of both intellect and communication skills, and it was a ton of fun to have them around for a week.  Sprinkled in between the presentations on reinforcement learning and FunSearch (soon to become AlphaEvolve), autoformalization and vibecoding, though, there was a repeated refrain: *we're not trying to replace you mathematicians, only to build tools to help you do what you do*.  (Ironically, in a feedback session, many on the math side responded, *don't build something that just solves all the math problems, that's the part we enjoy!*)

On the final day of the workshop, Demis Hassabis showed up and did a 
[Director's Conversation](https://youtu.be/TgS0nFeYul8?si=LluM69YSAG3GYXZb&t=1265)
with David Nirenberg.  A major function of the event is fundraising (the average net worth on IAS campus probably acquired an extra zero or two during the conversation), and both host and guest played their roles admirably.  I got the impression that Hassabis really wants to figure out what intelligence is.  Then, somewhere midway through the conversation, Hassabis said (and I'm paraphrasing, see especially 24:00--26:20 of the video), *we solved Go, we solved protein folding, math is isomorphic to those problems, we'll solve that next*.

Wait, what?

***

I'm not alone in thinking that, in essential and important ways, mathematics is not isomorphic to chess, Go, or protein folding.  As obvious as that may be to mathematicians, I think it's worth emphasizing that plenty of well-informed people don't see it that way.  In early August, popular econ blogger [Noah Smith](https://www.noahpinion.blog/p/the-end-of-the-age-of-heroes) wrote a generally quite insightful post that was nonetheless premised on the notion that AI is or soon will be better than humans at math.


Well, software has been solved, right?  Over the past 4-5 years Codex and Claude Code have gone from translating short natural-language text into simple Java applets, to completely and autonomously developing entire codebases.  But programming seems easier than math research: the LLMs already trained on zillions of tokens of code.  Plus, it's formal and completely self-verifying, if the code compiles, you win.

Right?

Here's [Zvi Mowshowitz](https://thezvi.substack.com/p/openais-unreleased-model-astra-solves#§how-narrow-was-this), also from early August (emphasis mine):
> I expect it to not be long before other types of math problems start getting solved.
>
> Coding and cyber are areas where we do not have full ASI (superintelligence) but where AI is clearly more capable than top humans at most central tasks, up to a reasonable high level of abstraction.
>
> **Those areas often have verification available, but not on the level of math.** No formula can tell you whether the code is good, in various senses, only that it passes its unit tests or that you captured the flag.

*Wait, isn't that exactly backwards!?*  But I expect this view is extremely common; I recently heard it echoed exactly by an acquaintance who works in software.

On the other hand, Mowshowitz continues with something I fully endorse:
> If you are counting on your own area to be too illegible for something like that, I would not be confident in that.

Maybe math and code are more alike than I'd thought.  In any case, what we have here is most definitely a failure to communicate.

***

So, outsiders don't really get what math is about.  But what do mathematicians think --- what are the core values of the mathematical community?

Looking at what mathematicians say and write, one area of broad agreement emerges: when we do mathematics, we are seeking a deeper understanding, and we want to communicate what we've understood to others.  That is, we want to *increase human knowledge and understanding*.

That's not to say everyone agrees that "understanding" is the most important value in mathematics.  The notion that human understanding should play even a central role is not universally accepted.  Dissent still arises around the old hypothetical about an AI proving the Riemann Hypothesis with a 100,000-page proof no human can read, certified by an inscrutable ten million lines of Lean.  *What about the classification of finite groups? Kepler's conjecture? the four-color theorem?*  (I side with the humanists, but the opposing "formalist" view has a case worth hearing, too.)  It's not often that someone outright disparages human understanding as a principle, but it [does happen](https://www.quantamagazine.org/to-have-machines-make-math-proofs-turn-them-into-a-puzzle-20251110/).

Still, "human understanding" as a core value, or even the primary one, is a fairly mainstream position within the mathematical community.  Most of us have read Thurston's famous "Proof and Progress" essay and nodded along in recognition.  And I suspect most of us wouldn't be doing the research we do if we didn't simply want to understand something.

But I don't think math is widely viewed this way by non-mathematicians.  And even if it were, is it enough to justify public support for mathematics?

***

I'm certainly far from the first to say all this.  With varying degrees of urgency, people have been writing on the gap between practice and perception of mathematics for decades, perhaps centuries.  Thurston's essay was a response to this question; Michael Harris's *Mathematics Without Apologies* is a book-length meditation on the issue, with erudite excursions into philosophy and sociology.  (Harris saw the clash between mechanization of mathematics and the incentive structure of our community long ago, and he keeps a lively report of current developments on his [blog](https://siliconreckoner.substack.com).  Not an endorsement of all opinions expressed there, but much respect for their thoughtfulness!)

But for ringing the alarm, the most cutting and insightful piece I've seen is the fantastic [essay](https://davidbessis.substack.com/p/the-fall-of-the-theorem-economy) by David Bessis from April of this year:

>I do expect to see, in the near future, one or more claims that AI has “solved math”, or “achieved mathematical supremacy.” And, given the current state of the conversation, I expect the actual evidence supporting these claims to be framed and/or understood as a defeat for human intelligence.
>
>If Geoff Hinton doesn’t get it, then 99.9999% of people won’t get it either.
>
>Whatever they will feel the urge to say when the disaster happens, mathematicians should start saying now. It is probably too late to entirely dodge the bullet, but at least they have a little time to anticipate and coordinate.

The entire essay should be required reading for any mathematician concerned about how AI has scrambled our incentives.  (And honestly, that should include all of us.)  The excerpt above is not even his primary argument: Bessis frames the human-understanding aspect as *secret math*, as opposed to the *official math* of proofs and logic.  The big question is, do we get to keep doing *secret math* --- the real reason we're here --- if machines can do *official math* better than humans, and most of society thinks that's all math is?


***

If we agree that "secret math" --- math for human understanding, independent of immediate payoff --- is the true purpose of our endeavors, we'll need to make that case.  I'll write more about my views on how to do that elsewhere.

Meanwhile, the nature of mathematics research is irrevocably different now.  Adjusting to the new world is not going to be easy, and it's natural to feel sorrow at what's lost.  But there is still lots of value in advancing and transmitting rigorous mathematical thinking (by humans!) --- through education and by example, this is a big part of what math research is for.

Besides, the world faces lots of challenges that demand clear thinking in the face of complex problems.  Not all of them are suited to a mathematician's skills, but at least part of the AI problem probably is.

There is much to do with our time here!

***

*Postscript*.  Among the myriad things I learned about mathematics and life from my former advisor, ongoing co-author, and friend Bill Fulton, one of the most profound was also one of the simplest.  Sometime in grad school, in a discussion about whether and which conferences to attend, he told me, "You know, people learn to do what people around them are doing."

From the time I started drafting this essay to the time I finished, dozens if not hundreds of others have appeared on similar topics.  Fantastic!  I haven't read them all, but many of those I have read are excellent.  Surely everything I've said here is contained in one or more of those; surely at least some of them said it better.

Was it still worthwhile to write?  Definitely: writing it helped me organize my thoughts, even if I had to slightly adjust the framing to fit the moment.  Will it be worthwhile to read?  I hope so.  Everyone is different, and maybe my piece will be the first place someone reads an idea in a way that makes sense to them.  More likely --- and more to the point --- mine could be the first essay someone reads *written by someone they know*.

If you're thinking of writing and sharing your thoughts somewhere, and wondering if it's worth the effort to organize them into something readable by others, consider doing it --- no matter if you're a grad student, mid-career, or retired.  *People learn from people around them*, especially from people they know.

***

*Thanks to Liz Vivas and Daoji Huang for conversations and for feedback on earlier drafts.*

-[Dave Anderson](https://pseudoeffective.github.io), 2026.9.15
