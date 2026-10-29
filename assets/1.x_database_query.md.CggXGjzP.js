import{_ as n,r as t,o as a,c as i,e as o,a as d,s as c}from"./chunks/framework.CXcwiNg-.js";const f=JSON.parse('{"title":"Queries - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Retrieving results","slug":"retrieving-results","link":"#retrieving-results","children":[{"level":4,"title":"Retrieving all rows from a table","slug":"retrieving-all-rows-from-a-table","link":"#retrieving-all-rows-from-a-table","children":[]},{"level":4,"title":"Retrieving a single row / column from a table","slug":"retrieving-a-single-row-column-from-a-table","link":"#retrieving-a-single-row-column-from-a-table","children":[]},{"level":4,"title":"Retrieving a list of column values","slug":"retrieving-a-list-of-column-values","link":"#retrieving-a-list-of-column-values","children":[]},{"level":3,"title":"Chunking results","slug":"chunking-results","link":"#chunking-results","children":[]},{"level":3,"title":"Aggregates","slug":"aggregates","link":"#aggregates","children":[{"level":4,"title":"Determining if records exist","slug":"determining-if-records-exist","link":"#determining-if-records-exist","children":[]}]}]},{"level":2,"title":"Selects","slug":"selects","link":"#selects","children":[{"level":4,"title":"Specifying a select clause","slug":"specifying-a-select-clause","link":"#specifying-a-select-clause","children":[]},{"level":4,"title":"Raw expressions","slug":"raw-expressions","link":"#raw-expressions","children":[]},{"level":4,"title":"Raw methods","slug":"raw-methods","link":"#raw-methods","children":[]}]},{"level":2,"title":"Joins","slug":"joins","link":"#joins","children":[{"level":4,"title":"Inner join statement","slug":"inner-join-statement","link":"#inner-join-statement","children":[]},{"level":4,"title":"Left join / right join statement","slug":"left-join-right-join-statement","link":"#left-join-right-join-statement","children":[]},{"level":4,"title":"Cross join statement","slug":"cross-join-statement","link":"#cross-join-statement","children":[]},{"level":4,"title":"Advanced join statements","slug":"advanced-join-statements","link":"#advanced-join-statements","children":[]},{"level":4,"title":"Subquery joins","slug":"subquery-joins","link":"#subquery-joins","children":[]}]},{"level":2,"title":"Unions","slug":"unions","link":"#unions","children":[]},{"level":2,"title":"Where clauses","slug":"where-clauses","link":"#where-clauses","children":[{"level":4,"title":"Simple where clauses","slug":"simple-where-clauses","link":"#simple-where-clauses","children":[]},{"level":4,"title":"\\"Or\\" statements","slug":"or-statements","link":"#or-statements","children":[]},{"level":4,"title":"\\"Where between\\" statements","slug":"where-between-statements","link":"#where-between-statements","children":[]},{"level":4,"title":"\\"Where in\\" statements","slug":"where-in-statements","link":"#where-in-statements","children":[]},{"level":4,"title":"\\"Where null\\" statements","slug":"where-null-statements","link":"#where-null-statements","children":[]},{"level":3,"title":"Advanced where clauses","slug":"advanced-where-clauses","link":"#advanced-where-clauses","children":[{"level":4,"title":"Parameter grouping","slug":"parameter-grouping","link":"#parameter-grouping","children":[]},{"level":4,"title":"Exists statements","slug":"exists-statements","link":"#exists-statements","children":[]},{"level":4,"title":"JSON \\"where\\" statements","slug":"json-where-statements","link":"#json-where-statements","children":[]}]},{"level":3,"title":"Conditional clauses","slug":"conditional-clauses","link":"#conditional-clauses","children":[]}]},{"level":2,"title":"Ordering, grouping, limit, & offset","slug":"ordering-grouping-limit-offset","link":"#ordering-grouping-limit-offset","children":[{"level":4,"title":"Sort order","slug":"sort-order","link":"#sort-order","children":[]},{"level":4,"title":"Latest / oldest","slug":"latest-oldest","link":"#latest-oldest","children":[]},{"level":4,"title":"Random order","slug":"random-order","link":"#random-order","children":[]},{"level":4,"title":"Grouping","slug":"grouping","link":"#grouping","children":[]},{"level":4,"title":"Limit and offset","slug":"limit-and-offset","link":"#limit-and-offset","children":[]}]},{"level":2,"title":"Inserts","slug":"inserts","link":"#inserts","children":[{"level":4,"title":"Auto-incrementing IDs","slug":"auto-incrementing-ids","link":"#auto-incrementing-ids","children":[]}]},{"level":2,"title":"Updates","slug":"updates","link":"#updates","children":[{"level":4,"title":"Update or Insert (One query per row)","slug":"update-or-insert-one-query-per-row","link":"#update-or-insert-one-query-per-row","children":[]},{"level":4,"title":"Update or Insert / upsert() (Batch query to process multiple rows in one DB call)","slug":"update-or-insert-upsert-batch-query-to-process-multiple-rows-in-one-db-call","link":"#update-or-insert-upsert-batch-query-to-process-multiple-rows-in-one-db-call","children":[]},{"level":4,"title":"Updating JSON columns","slug":"updating-json-columns","link":"#updating-json-columns","children":[]},{"level":4,"title":"Increment / decrement","slug":"increment-decrement","link":"#increment-decrement","children":[]}]},{"level":2,"title":"Deletes","slug":"deletes","link":"#deletes","children":[]},{"level":2,"title":"Pessimistic locking","slug":"pessimistic-locking","link":"#pessimistic-locking","children":[]},{"level":2,"title":"Caching queries","slug":"caching-queries","link":"#caching-queries","children":[{"level":3,"title":"Persistent caching","slug":"persistent-caching","link":"#persistent-caching","children":[]},{"level":3,"title":"In-memory caching","slug":"in-memory-caching","link":"#in-memory-caching","children":[]}]},{"level":2,"title":"Debugging","slug":"debugging","link":"#debugging","children":[]}],"relativePath":"1.x/database/query.md","filePath":"1.x/database/query.md"}'),l={name:"1.x/database/query.md"};function u(h,e,g,p,m,b){const s=t("pre-heading"),r=t("post-heading");return a(),i("div",null,[o(s),e[0]||(e[0]=d("h1",null,"Queries",-1)),o(r),e[1]||(e[1]=c(`<p>The database query builder provides a convenient, fluent interface to creating and running database queries. It can be used to perform most database operations in your application, and works on all supported database systems.</p><blockquote><p><strong>Note:</strong> The query builder uses PDO parameter binding to protect your application against SQL injection attacks. There is no need to clean strings being passed as bindings.</p></blockquote><h2 id="retrieving-results"><a href="#retrieving-results" class="header-anchor">#</a> Retrieving results</h2><h4 id="retrieving-all-rows-from-a-table"><a href="#retrieving-all-rows-from-a-table" class="header-anchor">#</a> Retrieving all rows from a table</h4><p>To begin a fluent query, use the <code>table</code> method on the <code>Db</code> facade. The <code>table</code> method returns a fluent query builder instance for the given table, allowing you to chain more constraints onto the query and then finally get the results. In this example, let&#39;s just <code>get</code> all records from a table:</p><pre><code>$users = Db::table(&#39;users&#39;)-&gt;get();
</code></pre><p>Like <a href="./../database/basics.html#running-raw-sql-queries">raw queries</a>, the <code>get</code> method returns an <code>array</code> of results where each result is an instance of the PHP <code>stdClass</code> object. You may access each column&#39;s value by accessing the column as a property of the object:</p><pre><code>foreach ($users as $user) {
    echo $user-&gt;name;
}
</code></pre><h4 id="retrieving-a-single-row-column-from-a-table"><a href="#retrieving-a-single-row-column-from-a-table" class="header-anchor">#</a> Retrieving a single row / column from a table</h4><p>If you just need to retrieve a single row from the database table, you may use the <code>first</code> method. This method will return a single <code>stdClass</code> object:</p><pre><code>$user = Db::table(&#39;users&#39;)-&gt;where(&#39;name&#39;, &#39;John&#39;)-&gt;first();

echo $user-&gt;name;
</code></pre><p>If you don&#39;t even need an entire row, you may extract a single value from a record using the <code>value</code> method. This method will return the value of the column directly:</p><pre><code>$email = Db::table(&#39;users&#39;)-&gt;where(&#39;name&#39;, &#39;John&#39;)-&gt;value(&#39;email&#39;);
</code></pre><h4 id="retrieving-a-list-of-column-values"><a href="#retrieving-a-list-of-column-values" class="header-anchor">#</a> Retrieving a list of column values</h4><p>If you would like to retrieve an array containing the values of a single column, you may use the <code>lists</code> method. In this example, we&#39;ll retrieve an array of role titles:</p><pre><code>$titles = Db::table(&#39;roles&#39;)-&gt;lists(&#39;title&#39;);

foreach ($titles as $title) {
    echo $title;
}
</code></pre><p>You may also specify a custom key column for the returned array:</p><pre><code>$roles = Db::table(&#39;roles&#39;)-&gt;lists(&#39;title&#39;, &#39;name&#39;);

foreach ($roles as $name =&gt; $title) {
    echo $title;
}
</code></pre><h3 id="chunking-results"><a href="#chunking-results" class="header-anchor">#</a> Chunking results</h3><p>If you need to work with thousands of database records, consider using the <code>chunk</code> method. This method retrieves a small &quot;chunk&quot; of the results at a time, and feeds each chunk into a <code>Closure</code> for processing. This method is very useful for writing <a href="./../console/development.html">console commands</a> that process thousands of records. For example, let&#39;s work with the entire <code>users</code> table in chunks of 100 records at a time:</p><pre><code>Db::table(&#39;users&#39;)-&gt;chunk(100, function($users) {
    foreach ($users as $user) {
        //
    }
});
</code></pre><p>You may stop further chunks from being processed by returning <code>false</code> from the <code>Closure</code>:</p><pre><code>Db::table(&#39;users&#39;)-&gt;chunk(100, function($users) {
    // Process the records...

    return false;
});
</code></pre><p>If you are updating database records while chunking results, your chunk results could change in unexpected ways. So, when updating records while chunking, it is always best to use the <code>chunkById</code> method instead. This method will automatically paginate the results based on the record&#39;s primary key:</p><pre><code>Db::table(&#39;users&#39;)-&gt;where(&#39;active&#39;, false)
    -&gt;chunkById(100, function ($users) {
        foreach ($users as $user) {
            Db::table(&#39;users&#39;)
                -&gt;where(&#39;id&#39;, $user-&gt;id)
                -&gt;update([&#39;active&#39; =&gt; true]);
        }
    });
</code></pre><blockquote><p><strong>Note:</strong> When updating or deleting records inside the chunk callback, any changes to the primary key or foreign keys could affect the chunk query. This could potentially result in records not being included in the chunked results.</p></blockquote><h3 id="aggregates"><a href="#aggregates" class="header-anchor">#</a> Aggregates</h3><p>The query builder also provides a variety of aggregate methods, such as <code>count</code>, <code>max</code>, <code>min</code>, <code>avg</code>, and <code>sum</code>. You may call any of these methods after constructing your query:</p><pre><code>$users = Db::table(&#39;users&#39;)-&gt;count();

$price = Db::table(&#39;orders&#39;)-&gt;max(&#39;price&#39;);
</code></pre><p>Of course, you may combine these methods with other clauses to build your query:</p><pre><code>$price = Db::table(&#39;orders&#39;)
    -&gt;where(&#39;is_finalized&#39;, 1)
    -&gt;avg(&#39;price&#39;);
</code></pre><h4 id="determining-if-records-exist"><a href="#determining-if-records-exist" class="header-anchor">#</a> Determining if records exist</h4><p>Instead of using the <code>count</code> method to determine if any records exist that match your query&#39;s constraints, you may use the <code>exists</code> and <code>doesntExist</code> methods:</p><pre><code>return Db::table(&#39;orders&#39;)-&gt;where(&#39;finalized&#39;, 1)-&gt;exists();

return Db::table(&#39;orders&#39;)-&gt;where(&#39;finalized&#39;, 1)-&gt;doesntExist();
</code></pre><h2 id="selects"><a href="#selects" class="header-anchor">#</a> Selects</h2><h4 id="specifying-a-select-clause"><a href="#specifying-a-select-clause" class="header-anchor">#</a> Specifying a select clause</h4><p>Of course, you may not always want to select all columns from a database table. Using the <code>select</code> method, you can specify a custom <code>select</code> clause for the query:</p><pre><code>$users = Db::table(&#39;users&#39;)-&gt;select(&#39;name&#39;, &#39;email as user_email&#39;)-&gt;get();
</code></pre><p>The <code>distinct</code> method allows you to force the query to return distinct results:</p><pre><code>$users = Db::table(&#39;users&#39;)-&gt;distinct()-&gt;get();
</code></pre><p>If you already have a query builder instance and you wish to add a column to its existing select clause, you may use the <code>addSelect</code> method:</p><pre><code>$query = Db::table(&#39;users&#39;)-&gt;select(&#39;name&#39;);

$users = $query-&gt;addSelect(&#39;age&#39;)-&gt;get();
</code></pre><p>If you wish to concatenate columns and/or strings together, you may use the <code>selectConcat</code> method to specify a list of concatenated values and the resulting alias. If you wish to use strings in the concatenation, you must provide a quoted string:</p><pre><code>$query = Db::table(&#39;users&#39;)-&gt;selectConcat([&#39;&quot;Name: &quot;&#39;, &#39;first_name&#39;, &#39;last_name&#39;], &#39;name_string&#39;);

$nameString = $query-&gt;first()-&gt;name_string;   // Name: John Smith
</code></pre><h4 id="raw-expressions"><a href="#raw-expressions" class="header-anchor">#</a> Raw expressions</h4><p>Sometimes you may need to use a raw expression in a query. To create a raw expression, you may use the <code>Db::raw</code> method:</p><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;select(Db::raw(&#39;count(*) as user_count, status&#39;))
    -&gt;where(&#39;status&#39;, &#39;&lt;&gt;&#39;, 1)
    -&gt;groupBy(&#39;status&#39;)
    -&gt;get();
</code></pre><blockquote><p><strong>Note:</strong> Raw statements will be injected into the query as strings, so you should be extremely careful to not create SQL injection vulnerabilities.</p></blockquote><h4 id="raw-methods"><a href="#raw-methods" class="header-anchor">#</a> Raw methods</h4><p>Instead of using <code>Db::raw</code>, you may also use the following methods to insert a raw expression into various parts of your query.</p><p><strong>selectRaw</strong></p><p>The <code>selectRaw</code> method can be used in place of <code>addSelect(Db::raw(...)).</code> This method accepts an optional array of bindings as its second argument:</p><pre><code>$orders = Db::table(&#39;orders&#39;)
                -&gt;selectRaw(&#39;price * ? as price_with_tax&#39;, [1.0825])
                -&gt;get();
</code></pre><p><strong>whereRaw / orWhereRaw</strong></p><p>The <code>whereRaw</code> and <code>orWhereRaw</code> methods can be used to inject a raw <code>where</code> clause into your query. These methods accept an optional array of bindings as their second argument:</p><pre><code>$orders = Db::table(&#39;orders&#39;)
                -&gt;whereRaw(&#39;price &gt; IF(state = &quot;TX&quot;, ?, 100)&#39;, [200])
                -&gt;get();
</code></pre><p><strong>havingRaw / orHavingRaw</strong></p><p>The <code>havingRaw</code> and <code>orHavingRaw</code> methods may be used to set a raw string as the value of the <code>having</code> clause. These methods accept an optional array of bindings as their second argument:</p><pre><code>$orders = Db::table(&#39;orders&#39;)
                -&gt;select(&#39;department&#39;, Db::raw(&#39;SUM(price) as total_sales&#39;))
                -&gt;groupBy(&#39;department&#39;)
                -&gt;havingRaw(&#39;SUM(price) &gt; ?&#39;, [2500])
                -&gt;get();
</code></pre><p><strong>orderByRaw</strong></p><p>The <code>orderByRaw</code> method may be used to set a raw string as the value of the order by clause:</p><pre><code>$orders = Db::table(&#39;orders&#39;)
                -&gt;orderByRaw(&#39;updated_at - created_at DESC&#39;)
                -&gt;get();
</code></pre><p><strong>groupByRaw</strong></p><p>The <code>groupByRaw</code> method may be used to set a raw string as the value of the group by clause:</p><pre><code>$orders = Db::table(&#39;orders&#39;)
                -&gt;select(&#39;city&#39;, &#39;state&#39;)
                -&gt;groupByRaw(&#39;city, state&#39;)
                -&gt;get();
</code></pre><h2 id="joins"><a href="#joins" class="header-anchor">#</a> Joins</h2><h4 id="inner-join-statement"><a href="#inner-join-statement" class="header-anchor">#</a> Inner join statement</h4><p>The query builder may also be used to write join statements. To perform a basic SQL &quot;inner join&quot;, you may use the <code>join</code> method on a query builder instance. The first argument passed to the <code>join</code> method is the name of the table you need to join to, while the remaining arguments specify the column constraints for the join. Of course, as you can see, you can join to multiple tables in a single query:</p><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;join(&#39;contacts&#39;, &#39;users.id&#39;, &#39;=&#39;, &#39;contacts.user_id&#39;)
    -&gt;join(&#39;orders&#39;, &#39;users.id&#39;, &#39;=&#39;, &#39;orders.user_id&#39;)
    -&gt;select(&#39;users.*&#39;, &#39;contacts.phone&#39;, &#39;orders.price&#39;)
    -&gt;get();
</code></pre><h4 id="left-join-right-join-statement"><a href="#left-join-right-join-statement" class="header-anchor">#</a> Left join / right join statement</h4><p>If you would like to perform a &quot;left join&quot; or &quot;right join&quot; instead of an &quot;inner join&quot;, use the <code>leftJoin</code> or <code>rightJoin</code> method. The <code>leftJoin</code> and <code>rightJoin</code> methods have the same signature as the <code>join</code> method:</p><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;leftJoin(&#39;posts&#39;, &#39;users.id&#39;, &#39;=&#39;, &#39;posts.user_id&#39;)
    -&gt;get();

$users = Db::table(&#39;users&#39;)
    -&gt;rightJoin(&#39;posts&#39;, &#39;users.id&#39;, &#39;=&#39;, &#39;posts.user_id&#39;)
    -&gt;get();
</code></pre><h4 id="cross-join-statement"><a href="#cross-join-statement" class="header-anchor">#</a> Cross join statement</h4><p>To perform a &quot;cross join&quot; use the <code>crossJoin</code> method with the name of the table you wish to cross join to. Cross joins generate a cartesian product between the first table and the joined table:</p><pre><code>$users = Db::table(&#39;sizes&#39;)
            -&gt;crossJoin(&#39;colors&#39;)
            -&gt;get();
</code></pre><h4 id="advanced-join-statements"><a href="#advanced-join-statements" class="header-anchor">#</a> Advanced join statements</h4><p>You may also specify more advanced join clauses. To get started, pass a <code>Closure</code> as the second argument into the <code>join</code> method. The <code>Closure</code> will receive a <code>JoinClause</code> object which allows you to specify constraints on the <code>join</code> clause:</p><pre><code>Db::table(&#39;users&#39;)
    -&gt;join(&#39;contacts&#39;, function ($join) {
        $join-&gt;on(&#39;users.id&#39;, &#39;=&#39;, &#39;contacts.user_id&#39;)-&gt;orOn(...);
    })
    -&gt;get();
</code></pre><p>If you would like to use a &quot;where&quot; style clause on your joins, you may use the <code>where</code> and <code>orWhere</code> methods on a join. Instead of comparing two columns, these methods will compare the column against a value:</p><pre><code>Db::table(&#39;users&#39;)
    -&gt;join(&#39;contacts&#39;, function ($join) {
        $join-&gt;on(&#39;users.id&#39;, &#39;=&#39;, &#39;contacts.user_id&#39;)
            -&gt;where(&#39;contacts.user_id&#39;, &#39;&gt;&#39;, 5);
    })
    -&gt;get();
</code></pre><h4 id="subquery-joins"><a href="#subquery-joins" class="header-anchor">#</a> Subquery joins</h4><p>You may use the <code>joinSub</code>, <code>leftJoinSub</code>, and <code>rightJoinSub</code> methods to join a query to a subquery. Each of these methods receive three arguments: the subquery, its table alias, and a Closure that defines the related columns:</p><pre><code>$latestPosts = Db::table(&#39;posts&#39;)
                   -&gt;select(&#39;user_id&#39;, Db::raw(&#39;MAX(created_at) as last_post_created_at&#39;))
                   -&gt;where(&#39;is_published&#39;, true)
                   -&gt;groupBy(&#39;user_id&#39;);

$users = Db::table(&#39;users&#39;)
            -&gt;joinSub($latestPosts, &#39;latest_posts&#39;, function ($join) {
                $join-&gt;on(&#39;users.id&#39;, &#39;=&#39;, &#39;latest_posts.user_id&#39;);
            })-&gt;get();
</code></pre><h2 id="unions"><a href="#unions" class="header-anchor">#</a> Unions</h2><p>The query builder also provides a quick way to &quot;union&quot; two queries together. For example, you may create an initial query, and then use the <code>union</code> method to union it with a second query:</p><pre><code>$first = Db::table(&#39;users&#39;)
    -&gt;whereNull(&#39;first_name&#39;);

$users = Db::table(&#39;users&#39;)
    -&gt;whereNull(&#39;last_name&#39;)
    -&gt;union($first)
    -&gt;get();
</code></pre><p>The <code>unionAll</code> method is also available and has the same method signature as <code>union</code>.</p><h2 id="where-clauses"><a href="#where-clauses" class="header-anchor">#</a> Where clauses</h2><h4 id="simple-where-clauses"><a href="#simple-where-clauses" class="header-anchor">#</a> Simple where clauses</h4><p>To add <code>where</code> clauses to the query, use the <code>where</code> method on a query builder instance. The most basic call to <code>where</code> requires three arguments. The first argument is the name of the column. The second argument is an operator, which can be any of the database&#39;s supported operators. The third argument is the value to evaluate against the column.</p><p>For example, here is a query that verifies the value of the &quot;votes&quot; column is equal to 100:</p><pre><code>$users = Db::table(&#39;users&#39;)-&gt;where(&#39;votes&#39;, &#39;=&#39;, 100)-&gt;get();
</code></pre><p>For convenience, if you simply want to verify that a column is equal to a given value, you may pass the value directly as the second argument to the <code>where</code> method:</p><pre><code>$users = Db::table(&#39;users&#39;)-&gt;where(&#39;votes&#39;, 100)-&gt;get();
</code></pre><p>Of course, you may use a variety of other operators when writing a <code>where</code> clause:</p><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;where(&#39;votes&#39;, &#39;&gt;=&#39;, 100)
    -&gt;get();

$users = Db::table(&#39;users&#39;)
    -&gt;where(&#39;votes&#39;, &#39;&lt;&gt;&#39;, 100)
    -&gt;get();

$users = Db::table(&#39;users&#39;)
    -&gt;where(&#39;name&#39;, &#39;like&#39;, &#39;T%&#39;)
    -&gt;get();
</code></pre><h4 id="or-statements"><a href="#or-statements" class="header-anchor">#</a> &quot;Or&quot; statements</h4><p>You may chain where constraints together, as well as add <code>or</code> clauses to the query. The <code>orWhere</code> method accepts the same arguments as the <code>where</code> method:</p><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;where(&#39;votes&#39;, &#39;&gt;&#39;, 100)
    -&gt;orWhere(&#39;name&#39;, &#39;John&#39;)
    -&gt;get();
</code></pre><blockquote><p><strong>Tip:</strong> You can also prefix <code>or</code> to any of the where statements methods below, to make the condition an &quot;OR&quot; condition - for example, <code>orWhereBetween</code>, <code>orWhereIn</code>, etc.</p></blockquote><h4 id="where-between-statements"><a href="#where-between-statements" class="header-anchor">#</a> &quot;Where between&quot; statements</h4><p>The <code>whereBetween</code> method verifies that a column&#39;s value is between two values:</p><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;whereBetween(&#39;votes&#39;, [1, 100])-&gt;get();
</code></pre><p>The <code>whereNotBetween</code> method verifies that a column&#39;s value lies outside of two values:</p><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;whereNotBetween(&#39;votes&#39;, [1, 100])
    -&gt;get();
</code></pre><h4 id="where-in-statements"><a href="#where-in-statements" class="header-anchor">#</a> &quot;Where in&quot; statements</h4><p>The <code>whereIn</code> method verifies that a given column&#39;s value is contained within the given array:</p><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;whereIn(&#39;id&#39;, [1, 2, 3])
    -&gt;get();
</code></pre><p>The <code>whereNotIn</code> method verifies that the given column&#39;s value is <strong>not</strong> contained in the given array:</p><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;whereNotIn(&#39;id&#39;, [1, 2, 3])
    -&gt;get();
</code></pre><h4 id="where-null-statements"><a href="#where-null-statements" class="header-anchor">#</a> &quot;Where null&quot; statements</h4><p>The <code>whereNull</code> method verifies that the value of the given column is <code>NULL</code>:</p><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;whereNull(&#39;updated_at&#39;)
    -&gt;get();
</code></pre><p>The <code>whereNotNull</code> method verifies that the column&#39;s value is <strong>not</strong> <code>NULL</code>:</p><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;whereNotNull(&#39;updated_at&#39;)
    -&gt;get();
</code></pre><h3 id="advanced-where-clauses"><a href="#advanced-where-clauses" class="header-anchor">#</a> Advanced where clauses</h3><h4 id="parameter-grouping"><a href="#parameter-grouping" class="header-anchor">#</a> Parameter grouping</h4><p>Sometimes you may need to create more advanced where clauses such as &quot;where exists&quot; or nested parameter groupings. The Laravel query builder can handle these as well. To get started, let&#39;s look at an example of grouping constraints within parenthesis:</p><pre><code>Db::table(&#39;users&#39;)
    -&gt;where(&#39;name&#39;, &#39;=&#39;, &#39;John&#39;)
    -&gt;orWhere(function ($query) {
        $query-&gt;where(&#39;votes&#39;, &#39;&gt;&#39;, 100)
            -&gt;where(&#39;title&#39;, &#39;&lt;&gt;&#39;, &#39;Admin&#39;);
    })
    -&gt;get();
</code></pre><p>As you can see, passing <code>Closure</code> into the <code>orWhere</code> method instructs the query builder to begin a constraint group. The <code>Closure</code> will receive a query builder instance which you can use to set the constraints that should be contained within the parenthesis group. The example above will produce the following SQL:</p><pre><code>select * from users where name = &#39;John&#39; or (votes &gt; 100 and title &lt;&gt; &#39;Admin&#39;)
</code></pre><h4 id="exists-statements"><a href="#exists-statements" class="header-anchor">#</a> Exists statements</h4><p>The <code>whereExists</code> method allows you to write <code>where exist</code> SQL clauses. The <code>whereExists</code> method accepts a <code>Closure</code> argument, which will receive a query builder instance allowing you to define the query that should be placed inside of the &quot;exists&quot; clause:</p><pre><code>Db::table(&#39;users&#39;)
    -&gt;whereExists(function ($query) {
        $query-&gt;select(Db::raw(1))
            -&gt;from(&#39;orders&#39;)
            -&gt;whereRaw(&#39;orders.user_id = users.id&#39;);
    })
    -&gt;get();
</code></pre><p>The query above will produce the following SQL:</p><pre><code>select * from users where exists (
    select 1 from orders where orders.user_id = users.id
)
</code></pre><h4 id="json-where-statements"><a href="#json-where-statements" class="header-anchor">#</a> JSON &quot;where&quot; statements</h4><p>October CMS also supports querying JSON column types on databases that provide support for JSON column types. To query a JSON column, use the <code>-&gt;</code> operator:</p><pre><code>$users = Db::table(&#39;users&#39;)
                -&gt;where(&#39;options-&gt;language&#39;, &#39;en&#39;)
                -&gt;get();

$users = Db::table(&#39;users&#39;)
                -&gt;where(&#39;preferences-&gt;dining-&gt;meal&#39;, &#39;salad&#39;)
                -&gt;get();
</code></pre><p>You may use <code>whereJsonContains</code> to query JSON arrays (not supported on SQLite):</p><pre><code>$users = Db::table(&#39;users&#39;)
                -&gt;whereJsonContains(&#39;options-&gt;languages&#39;, &#39;en&#39;)
                -&gt;get();
</code></pre><p>MySQL and PostgreSQL support <code>whereJsonContains</code> with multiple values:</p><pre><code>$users = Db::table(&#39;users&#39;)
                -&gt;whereJsonContains(&#39;options-&gt;languages&#39;, [&#39;en&#39;, &#39;de&#39;])
                -&gt;get();
</code></pre><p>You may use <code>whereJsonLength</code> to query JSON arrays by their length:</p><pre><code>$users = Db::table(&#39;users&#39;)
                -&gt;whereJsonLength(&#39;options-&gt;languages&#39;, 0)
                -&gt;get();

$users = Db::table(&#39;users&#39;)
                -&gt;whereJsonLength(&#39;options-&gt;languages&#39;, &#39;&gt;&#39;, 1)
                -&gt;get();
</code></pre><h3 id="conditional-clauses"><a href="#conditional-clauses" class="header-anchor">#</a> Conditional clauses</h3><p>Sometimes you may want clauses to apply to a query only when something else is true. For instance you may only want to apply a <code>where</code> statement if a given input value is present on the incoming request. You may accomplish this using the <code>when</code> method:</p><pre><code>$role = $request-&gt;input(&#39;role&#39;);

$users = Db::table(&#39;users&#39;)
                -&gt;when($role, function ($query, $role) {
                    return $query-&gt;where(&#39;role_id&#39;, $role);
                })
                -&gt;get();
</code></pre><p>The <code>when</code> method only executes the given Closure when the first parameter is <code>true</code>. If the first parameter is <code>false</code>, the Closure will not be executed.</p><p>You may pass another Closure as the third parameter to the <code>when</code> method. This Closure will execute if the first parameter evaluates as false. To illustrate how this feature may be used, we will use it to configure the default sorting of a query:</p><pre><code>$sortBy = null;

$users = Db::table(&#39;users&#39;)
                -&gt;when($sortBy, function ($query, $sortBy) {
                    return $query-&gt;orderBy($sortBy);
                }, function ($query) {
                    return $query-&gt;orderBy(&#39;name&#39;);
                })
                -&gt;get();
</code></pre><h2 id="ordering-grouping-limit-offset"><a href="#ordering-grouping-limit-offset" class="header-anchor">#</a> Ordering, grouping, limit, &amp; offset</h2><h4 id="sort-order"><a href="#sort-order" class="header-anchor">#</a> Sort order</h4><p>The <code>orderBy</code> method allows you to sort the result of the query by a given column. The first argument to the <code>orderBy</code> method should be the column you wish to sort by, while the second argument controls the direction of the sort and may be either <code>asc</code> or <code>desc</code>:</p><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;orderBy(&#39;name&#39;, &#39;desc&#39;)
    -&gt;get();
</code></pre><h4 id="latest-oldest"><a href="#latest-oldest" class="header-anchor">#</a> Latest / oldest</h4><p>The <code>latest</code> and <code>oldest</code> methods allow you to easily order results by date. By default, result will be ordered by the <code>created_at</code> column. Or, you may pass the column name that you wish to sort by:</p><pre><code>$user = Db::table(&#39;users&#39;)
    -&gt;latest()
    -&gt;first();
</code></pre><h4 id="random-order"><a href="#random-order" class="header-anchor">#</a> Random order</h4><p>The <code>inRandomOrder</code> method may be used to sort the query results randomly. For example, you may use this method to fetch a random user:</p><pre><code>$randomUser = Db::table(&#39;users&#39;)
    -&gt;inRandomOrder()
    -&gt;first();
</code></pre><h4 id="grouping"><a href="#grouping" class="header-anchor">#</a> Grouping</h4><p>The <code>groupBy</code> and <code>having</code> methods may be used to group the query results. The <code>having</code> method&#39;s signature is similar to that of the <code>where</code> method:</p><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;groupBy(&#39;account_id&#39;)
    -&gt;having(&#39;account_id&#39;, &#39;&gt;&#39;, 100)
    -&gt;get();
</code></pre><p>You may pass multiple arguments to the <code>groupBy</code> method to group by multiple columns:</p><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;groupBy(&#39;first_name&#39;, &#39;status&#39;)
    -&gt;having(&#39;account_id&#39;, &#39;&gt;&#39;, 100)
    -&gt;get();
</code></pre><p>For more advanced <code>having</code> statements, you may wish to use the <a href="#aggregates"><code>havingRaw</code></a> method.</p><h4 id="limit-and-offset"><a href="#limit-and-offset" class="header-anchor">#</a> Limit and offset</h4><p>To limit the number of results returned from the query, or to skip a given number of results in the query (<code>OFFSET</code>), you may use the <code>skip</code> and <code>take</code> methods:</p><pre><code>$users = Db::table(&#39;users&#39;)-&gt;skip(10)-&gt;take(5)-&gt;get();
</code></pre><h2 id="inserts"><a href="#inserts" class="header-anchor">#</a> Inserts</h2><p>The query builder also provides an <code>insert</code> method for inserting records into the database table. The <code>insert</code> method accepts an array of column names and values to insert:</p><pre><code>Db::table(&#39;users&#39;)-&gt;insert(
    [&#39;email&#39; =&gt; &#39;john@example.com&#39;, &#39;votes&#39; =&gt; 0]
);
</code></pre><p>You may even insert several records into the table with a single call to <code>insert</code> by passing an array of arrays. Each array represents a row to be inserted into the table:</p><pre><code>Db::table(&#39;users&#39;)-&gt;insert([
    [&#39;email&#39; =&gt; &#39;taylor@example.com&#39;, &#39;votes&#39; =&gt; 0],
    [&#39;email&#39; =&gt; &#39;dayle@example.com&#39;, &#39;votes&#39; =&gt; 0]
]);
</code></pre><h4 id="auto-incrementing-ids"><a href="#auto-incrementing-ids" class="header-anchor">#</a> Auto-incrementing IDs</h4><p>If the table has an auto-incrementing id, use the <code>insertGetId</code> method to insert a record and then retrieve the ID:</p><pre><code>$id = Db::table(&#39;users&#39;)-&gt;insertGetId(
    [&#39;email&#39; =&gt; &#39;john@example.com&#39;, &#39;votes&#39; =&gt; 0]
);
</code></pre><blockquote><p><strong>Note:</strong> When using the PostgreSQL database driver, the insertGetId method expects the auto-incrementing column to be named <code>id</code>. If you would like to retrieve the ID from a different &quot;sequence&quot;, you may pass the sequence name as the second parameter to the <code>insertGetId</code> method.</p></blockquote><h2 id="updates"><a href="#updates" class="header-anchor">#</a> Updates</h2><p>In addition to inserting records into the database, the query builder can also update existing records using the <code>update</code> method. The <code>update</code> method, like the <code>insert</code> method, accepts an array of column and value pairs containing the columns to be updated. You may constrain the <code>update</code> query using <code>where</code> clauses:</p><pre><code>Db::table(&#39;users&#39;)
    -&gt;where(&#39;id&#39;, 1)
    -&gt;update([&#39;votes&#39; =&gt; 1]);
</code></pre><h4 id="update-or-insert-one-query-per-row"><a href="#update-or-insert-one-query-per-row" class="header-anchor">#</a> Update or Insert (One query per row)</h4><p>Sometimes you may want to update an existing record in the database or create it if no matching record exists. In this scenario, the <code>updateOrInsert</code> method may be used. The <code>updateOrInsert</code> method accepts two arguments: an array of conditions by which to find the record, and an array of column and value pairs containing the columns to be updated.</p><p>The <code>updateOrInsert</code> method will first attempt to locate a matching database record using the first argument&#39;s column and value pairs. If the record exists, it will be updated with the values in the second argument. If the record can not be found, a new record will be inserted with the merged attributes of both arguments:</p><pre><code>Db::table(&#39;users&#39;)
    -&gt;updateOrInsert(
        [&#39;email&#39; =&gt; &#39;john@example.com&#39;, &#39;name&#39; =&gt; &#39;John&#39;],
        [&#39;votes&#39; =&gt; &#39;2&#39;]
    );
</code></pre><h4 id="update-or-insert-upsert-batch-query-to-process-multiple-rows-in-one-db-call"><a href="#update-or-insert-upsert-batch-query-to-process-multiple-rows-in-one-db-call" class="header-anchor">#</a> Update or Insert / <code>upsert()</code> (Batch query to process multiple rows in one DB call)</h4><p>The <code>upsert</code> method will insert rows that do not exist and update the rows that already exist with the new values. The method&#39;s first argument consists of the values to insert or update, while the second argument lists the column(s) that uniquely identify records within the associated table. The method&#39;s third and final argument is an array of columns that should be updated if a matching record already exists in the database:</p><pre><code>DB::table(&#39;flights&#39;)-&gt;upsert([
    [&#39;departure&#39; =&gt; &#39;Oakland&#39;, &#39;destination&#39; =&gt; &#39;San Diego&#39;, &#39;price&#39; =&gt; 99],
    [&#39;departure&#39; =&gt; &#39;Chicago&#39;, &#39;destination&#39; =&gt; &#39;New York&#39;, &#39;price&#39; =&gt; 150]
], [&#39;departure&#39;, &#39;destination&#39;], [&#39;price&#39;]);
</code></pre><blockquote><p><strong>Note:</strong> All databases except SQL Server require the columns in the second argument of the <code>upsert</code> method to have a &quot;primary&quot; or &quot;unique&quot; index.</p></blockquote><h4 id="updating-json-columns"><a href="#updating-json-columns" class="header-anchor">#</a> Updating JSON columns</h4><p>When updating a JSON column, you should use <code>-&gt;</code> syntax to access the appropriate key in the JSON object. This operation is supported on MySQL 5.7+ and PostgreSQL 9.5+:</p><pre><code>$affected = Db::table(&#39;users&#39;)
    -&gt;where(&#39;id&#39;, 1)
    -&gt;update([&#39;options-&gt;enabled&#39; =&gt; true]);
</code></pre><h4 id="increment-decrement"><a href="#increment-decrement" class="header-anchor">#</a> Increment / decrement</h4><p>The query builder also provides convenient methods for incrementing or decrementing the value of a given column. This is simply a short-cut, providing a more expressive and terse interface compared to manually writing the <code>update</code> statement.</p><p>Both of these methods accept at least one argument: the column to modify. A second argument may optionally be passed to control the amount by which the column should be incremented / decremented.</p><pre><code>Db::table(&#39;users&#39;)-&gt;increment(&#39;votes&#39;);

Db::table(&#39;users&#39;)-&gt;increment(&#39;votes&#39;, 5);

Db::table(&#39;users&#39;)-&gt;decrement(&#39;votes&#39;);

Db::table(&#39;users&#39;)-&gt;decrement(&#39;votes&#39;, 5);
</code></pre><p>You may also specify additional columns to update during the operation:</p><pre><code>Db::table(&#39;users&#39;)-&gt;increment(&#39;votes&#39;, 1, [&#39;name&#39; =&gt; &#39;John&#39;]);
</code></pre><h2 id="deletes"><a href="#deletes" class="header-anchor">#</a> Deletes</h2><p>The query builder may also be used to delete records from the table via the <code>delete</code> method:</p><pre><code>Db::table(&#39;users&#39;)-&gt;delete();
</code></pre><p>You may constrain <code>delete</code> statements by adding <code>where</code> clauses before calling the <code>delete</code> method:</p><pre><code>Db::table(&#39;users&#39;)-&gt;where(&#39;votes&#39;, &#39;&lt;&#39;, 100)-&gt;delete();
</code></pre><p>If you wish to truncate the entire table, which will remove all rows and reset the auto-incrementing ID to zero, you may use the <code>truncate</code> method:</p><pre><code>Db::table(&#39;users&#39;)-&gt;truncate();
</code></pre><h2 id="pessimistic-locking"><a href="#pessimistic-locking" class="header-anchor">#</a> Pessimistic locking</h2><p>The query builder also includes a few functions to help you do &quot;pessimistic locking&quot; on your <code>select</code> statements. To run the statement with a &quot;shared lock&quot;, you may use the <code>sharedLock</code> method on a query. A shared lock prevents the selected rows from being modified until your transaction commits:</p><pre><code>Db::table(&#39;users&#39;)-&gt;where(&#39;votes&#39;, &#39;&gt;&#39;, 100)-&gt;sharedLock()-&gt;get();
</code></pre><p>Alternatively, you may use the <code>lockForUpdate</code> method. A &quot;for update&quot; lock prevents the rows from being modified or from being selected with another shared lock:</p><pre><code>Db::table(&#39;users&#39;)-&gt;where(&#39;votes&#39;, &#39;&gt;&#39;, 100)-&gt;lockForUpdate()-&gt;get();
</code></pre><h2 id="caching-queries"><a href="#caching-queries" class="header-anchor">#</a> Caching queries</h2><h3 id="persistent-caching"><a href="#persistent-caching" class="header-anchor">#</a> Persistent caching</h3><p>You may easily cache the results of a query using the <a href="./../services/cache.html">Cache service</a>. Simply chain the <code>remember</code> or <code>rememberForever</code> method when preparing the query.</p><pre><code>$users = Db::table(&#39;users&#39;)-&gt;remember(10)-&gt;get();
</code></pre><p>In this example, the results of the query will be cached for ten minutes. While the results are cached, the query will not be run against the database, and the results will be loaded from the default cache driver specified for your application.</p><h3 id="in-memory-caching"><a href="#in-memory-caching" class="header-anchor">#</a> In-memory caching</h3><p>Duplicate queries across the same request can be prevented by using in-memory caching. This feature is enabled by default for <a href="./../database/model.html#retrieving-models">queries prepared by a model</a> but not those generated directly using the <code>Db</code> facade.</p><pre><code>Db::table(&#39;users&#39;)-&gt;get(); // Result from database
Db::table(&#39;users&#39;)-&gt;get(); // Result from database

Model::all(); // Result from database
Model::all(); // Result from in-memory cache
</code></pre><p>You may enable or disable the duplicate cache with either the <code>enableDuplicateCache</code> or <code>disableDuplicateCache</code> method.</p><pre><code>Db::table(&#39;users&#39;)-&gt;enableDuplicateCache()-&gt;get();
</code></pre><p>If a query is stored in the cache, it will automatically be cleared when an insert, update, delete, or truncate statement is used. However you may clear the cache manually using the <code>flushDuplicateCache</code> method.</p><pre><code>Db::flushDuplicateCache();
</code></pre><blockquote><p><strong>Note</strong>: In-memory caching is disabled entirely when running via the command-line interface (CLI).</p></blockquote><h2 id="debugging"><a href="#debugging" class="header-anchor">#</a> Debugging</h2><p>You may use the <code>dd</code> or <code>dump</code> methods while building a query to dump the query bindings and SQL. The <code>dd</code> method will display the debug information and then stop executing the request. The <code>dump</code> method will display the debug information but allow the request to keep executing:</p><pre><code>Db::table(&#39;users&#39;)-&gt;where(&#39;votes&#39;, &#39;&gt;&#39;, 100)-&gt;dd();

Db::table(&#39;users&#39;)-&gt;where(&#39;votes&#39;, &#39;&gt;&#39;, 100)-&gt;dump();
</code></pre>`,217))])}const w=n(l,[["render",u]]);export{f as __pageData,w as default};
