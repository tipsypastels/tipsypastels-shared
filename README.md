# PokéCommunity 3 Shared

This library contains shared logic between the client and server for PokéCommunity 3.0 aka "Newcore". Much of the stuff in here is generic type definitions, but there are also some hardcoded constants, such as the options for post reacts. In the future, it's possible we'll move some of this stuff into an admin panel of sorts, but as database queries are more expensive in PC3 (they have to send a seperate web request), it's preferable to hardcode certain values not likely to change.

Admins are welcome to edit this if they know what they're doing and need to change a constant. If you don't know what you're doing... get Dakota to do it :)