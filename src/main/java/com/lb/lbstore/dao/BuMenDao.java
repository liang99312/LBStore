/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class BuMenDao extends BaseDao {

    public boolean existBuMen(Integer qy_id, Integer id, String mc) {
        List parameters = new ArrayList();
        parameters.add(qy_id);
        List list = null;
        String sql = "";
        if (id > -1) {
            sql = "select 1 from bumen where qy_id=? and id!=? and mc =?";
            parameters.add(id);
            parameters.add(mc);
        } else {
            sql = "select 1 from bumen where qy_id=? and mc =?";
            parameters.add(mc);
        }
        list = this.getSqlResult(sql, parameters.toArray());
        return !list.isEmpty();
    }
}
